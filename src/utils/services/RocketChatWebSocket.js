import { w3cwebsocket as W3CWebSocket } from "websocket";

class RocketChatWebSocket {
  constructor(url, state) {
    this.client = new W3CWebSocket(url);
    this.isConnected = false;
    this.token = null;
    this.userId = null;
    this.username = null;
    this.messages = [];
    this.state = state;
  }
  static async sha256(message) {
    // Convert the string to an array buffer
    const msgBuffer = new TextEncoder().encode(message);

    // Hash the buffer
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // Convert the buffer to an array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert the array to a hexadecimal string
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }
  // Handle connection events
  connect() {
    this.client.onopen = () => {
      console.log("WebSocket Client Connected");
      // You can send a message here if needed
      this.send({ msg: "connect", version: "1", support: ["1"] });
    //   this.pingInterval = setInterval(() => {
    //     this.client.send(JSON.stringify({ msg: "ping" }));
    //   }, 3000);
    };

    this.client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(message);
        if (data.msg === "ping") {
            // This is where you would handle the custom ping message.
            console.log("Received ping from server");
            // Optionally, send a response if the server expects one.
            this.send({ msg: "pong" });
          }
        if (data.msg === "connected") {
          this.isConnected = true;
        } else if (data.msg === "changed" && data.collection === "stream-room-messages") {
          console.log("Received room message:", data.fields.args[0]);
        } else {
          console.log("Received:", message.data);
        }
      };

    this.client.onclose = () => {
      console.log("WebSocket client disconnected");
      this.isConnected = false;
    };

    this.client.onerror = (error) => {
      console.error("Connection Error:", error);
    };
  }

  // To send messages
  send(data) {
    if (this.isConnected || data.msg === "connect") {
      return this.client.send(JSON.stringify(data));
    } else {
      console.warn(
        "Trying to send message without handshake. Wait for connection."
      );
    }
  }
  async connectAndLogin(username, password) {
    return new Promise((resolve, reject) => {
      this.client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(message);
        if (data.msg === "connected") {
          this.isConnected = true;
          // Perform login
          this.client.send(
            JSON.stringify({
              msg: "method",
              method: "login",
              id: "42",
              params: [
                {
                  user: { username: username },
                  password: { digest: password, algorithm: "sha-256" },
                },
              ],
            })
          );
          this.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log("user data ===============>>>> ",data);
            if(data.msg === "added" && data.collection === "users"){
                this.username = data.fields.username;
                console.log("username ===============>>>> ",this.username);
            }
            if (data.msg === "result" && data.id === "42" && data.result) {
              this.token = data.result.token;
              this.userId = data.result.id;
              resolve(data.result);
            } else if (data.msg === "result" && data.id === "42" && data.error) {
              reject(data.error);
            }
          };
        } else if (data.msg === "result" && data.id === "42") {
          this.token = data.result.token;
          this.userId = data.result.id;
          resolve();
        }
      };

      this.client.onerror = (error) => {
        reject(error);
      };
    });
  }

  async getRooms() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        this.client.send(
          JSON.stringify({
            msg: "method",
            method: "rooms/get",
            id: "43",
          })
        );

        this.client.onmessage = (message) => {
          const data = JSON.parse(message.data);
          if(data.msg === "ping"){
                console.log("Received ping from server");
                this.send({ msg: "pong" });
            }
          if (data.msg === "result" && data.id === "43") {
            resolve(data.result);
          }
        };

        this.client.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error("WebSocket not connected"));
      }
    });
  }
  subscribeToRoom(roomId) {
    if (this.isConnected) {
      const msg = {
        msg: "sub",
        id: "uniqueIdForThisSubscription", // Consider using a unique id generator
        name: "stream-room-messages",
        params: [roomId, true],
      };
     const msg2 = {
        msg: "method",
        method: "sendMessageLivechat",
        params: [
          {
            _id: "XqEEHhQHvhFmK3Zoz",
            rid: "4j9AHuKMrk7yax58dX8b3frthSkisvwzQZ",
            msg: "test",
            token: this.token,
          },
        ],
        id: "11",
      };
      try{
      this.send(msg);
        // this.send(msg2);
        console.log(this.token)
        this.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            // if (data.msg === 'ping) 
            if(data.msg === "changed" && data.collection === "stream-room-messages"){
                // console.log("Received room message:", data.fields.args[0]);
                // set mesaage to state
                console.log("Received room message:", data.fields.args[0])
                this.state(data.fields.args[0]);
                // this.messages = [...this.messages,data.fields.args[0]];
            }
            if(data.msg === "ping"){
                console.log("Received ping from server");
                this.send({ msg: "pong" });
            }
            
            
            if (data.msg === "result" && data.id === "11") {
                console.log(data.result);
            }
            }

      }
      catch(err){
        console.log(err);
      }

    } else {
      console.warn("WebSocket not connected, cannot subscribe to room.");
    }
  }
  subscribeToAllRoomUpdates() {
    if (this.isConnected) {
        const msg = {
            "msg": "sub",
            "id": "unique-idsndsm,nds,mdn",
            "name": "stream-notify-all",
            "params":[
                "rooms-changed",
                false
            ]
        }
        this.send(msg);

        this.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log("notify all messages changed detected ======================>>>>>>>>",data)
            if (data.msg === "changed" && data.collection === "stream-notify-all") {
                if (data.fields && data.fields.eventName === "updateRoom") { 
                    console.log("Room update:", data.fields);
                    if (data.fields.type === "created") { // Check based on actual data structure
                        console.log("New room created:", data.fields.roomDetails);
                    }
                }
            }
            if(data.msg === "ping"){
                console.log("Received ping from server");
                this.send({ msg: "pong" });
            }
            // Handle other real-time events or messages here...
        };
    } else {
        console.warn("WebSocket not connected, cannot subscribe to all room updates.");
    }
}
}

export default RocketChatWebSocket;