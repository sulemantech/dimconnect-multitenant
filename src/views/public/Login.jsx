import { Button, Input, PasswordInput } from "@mantine/core";
import { useContext, useState } from "preact/hooks";
import api, { postAuth } from "../../api";
import Logo from "../../components/Logo";
import appConfig from "../../config/appConfig";
import { AuthState } from "../../providers/AuthProvider";
import PublicWrapper from "../../providers/PublicWrapper";
import { t, changeLanguage } from "i18next";

// import {logo} from '../../../public/logo.svg'
export default () => {
  const authState = useContext(AuthState);
  const [loading, setLoading] = useState(false);
  const [lng, setlng] = useState("EN");

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const email = event.target.email.value;
    const pass = event.target.password.value;

    postAuth(email, pass)
      .then(async ({ data }) => {
        authState.setAuth(true);
        const username = email.split("@")[0];
        const chatServerUser = await (username, email, pass, `Bearer ${data.token}`)
          // .then(async (res) => {
          //   console.log(res);
          //   const msgBuffer = new TextEncoder().encode(pass);

          //   // Hash the buffer
          //   const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

          //   // Convert the buffer to an array
          //   const hashArray = Array.from(new Uint8Array(hashBuffer));

          //   // Convert the array to a hexadecimal string
          //   const hashHex = hashArray
          //     .map((byte) => byte.toString(16).padStart(2, "0"))
          //     .join("");
          //   localStorage.setItem("cLgpssstore", hashHex)
          // })
          // .catch((err) => {
          //   console.log("erererererer", err);
          // });
        await new Promise((resolve) => setTimeout(resolve, 500));
        const msgBuffer = new TextEncoder().encode(pass);

            // Hash the buffer
            const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

            // Convert the buffer to an array
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            // Convert the array to a hexadecimal string
            const hashHex = hashArray
              .map((byte) => byte.toString(16).padStart(2, "0"))
              .join("");
            localStorage.setItem("cLgpssstore", hashHex)


        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem(
          appConfig.localStorageRefreshKey,
          data.refreshToken
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem(appConfig.localStorageKey, data.token);
        api.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
        setLoading(false);

        window.location.reload();
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <PublicWrapper>
      <div id="scale-down" className="relative min-w-[350px] rounded-lg shadow-2xl pb-14  bg-[#FFFFFF26] max-h-[80vh] max-laptop:max-h-[82vh] backdrop-blur-md max-laptop:min-w-[300px] max-[850px]:w-[200px]">
        <div className="flex justify-center">
          <div className=" mt-[40px] w-[200px] max-laptop:mt-[35px] max-laptop:w-[180px]">
            <Logo />
          </div>
        </div>
        <div
          className="absolute right-2 top-2 text-white text-xs"
          onClick={() => {
            if (lng == "DE") {
              setlng("EN");
              changeLanguage("de");
            } else {
              setlng("DE");
              changeLanguage("en");
            }
          }}
        >
          {lng}
        </div>
        <p className="flex justify-center text-white text-[0.7rem] text-sm mt-6">
          {t("Welcome")}
        </p>
        <p className="flex justify-center text-white text-[0.7rem]  text-sm mb-6">
          {t("Please sign in.")}
        </p>
        <form
          className="mt-8 space-y-8 max-laptop:mt-6 max-laptop:space-y-3"
          onSubmit={handleSubmit}
        >
          <div className=" flex flex-1 flex-col space-y-6 px-8 mt-6 max-laptop:mt-4">
            <Input
              color="blue"
              icon={<img src="/mail_in.svg" alt="" />}
              classNames={{
                input: " text-white  border-none bg-transparent outline-none ",
                wrapper: "border-b-[1px] border-white",
              }}
              type="email"
              placeholder="Email"
              required
              name="email"
            />

            <PasswordInput
              classNames={{
                input: "text-white border-none bg-transparent outline-none",
                wrapper: "border-b-[1px] border-white",
                innerInput:
                  "text-white border-none bg-transparent outline-none",
              }}
              icon={<img src="/lock.svg" alt="" />}
              placeholder="* * * * * * * *"
              required
              name="password"
            />

            <p className="text-red-700 text-xs font-light flex flex-row-reverse mt-2  ">
              {error}
            </p>
            {/* <img className=" w-[2rem] " src="closed_eye.svg" alt="" /> */}
          </div>

          <div className="flex justify-center  mt-10 max-laptop:mt-4   max-[850px]:mt-3">
            <Button size="sm" type="submit" loading={loading}>
              {t("SIGN IN")}
            </Button>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-8 max-laptop:mt-5 ">
        <img src="/logo_TUV.svg" className="" alt="" />
      </div>
    </PublicWrapper>
  );
};
