const tenantConfigs = {
  default: {
    GlobalConfiguration:{
      textcolor: '#404040'
    },
    usermanagement: {
      bgcolor: "#0E76BB",
      bordercolor: "#0E76BB",
      textcolor: "#0E76BB",
      sideimg: "./verticalbluebackground.svg",
      hoverburger: "bg-opacity-100",
      hoverbg: "bg-opacity-100",
    },
    header: {
      headtext: "#0E76BB", // Example: text-xl
      headselect: "border-brand", // Example: border-orange-400
      usericoncolor: "brand", // Example: text-cool-gray-600
    },
    navbar: {
      hoverburger: "border-sky-600",
      hoverbg: "brand",
      sideimg: "./verticalbluebackground.svg",
    },
    contactpage: {
      phonenumber: "0221 - 806 5700",
      textcolor: "#0078BE",
      motto: "Contacts, Training & Support",
      description:
        "Please describe your issue in detail, with any relevant information including device platform and version affected, steps taken leading to the issue, which period of time this problem is go on etc.",
      email: "support@dimconnect.com",
      image1: "/assets/icons/phone.png",
      image2: "/Group933.svg",
      image3: "/Group932.svg",
      logo: "/logo_TUV.svg",
      mobiles: "/DIMMOBILES.svg",
    },
    costinfo: {
      ICONS_COLORS: [
        "text-blue-500",
        "text-red-500",
        "text-green-500",
        "text-yellow-500",
        "text-purple-500",
        "text-pink-500",
        "text-indigo-500",
        "text-gray-500",
      ], // ✅ Make sure this key exists
      activeborder: "5px solid #0E76BB", // ✅ Make sure this key exists
      active: "#0E76BB", // ✅ Make sure this key exists
    },

    publicwrapper: {
      bgimg: "./bgimg.png",
    },
    mapelements: {
      inexistenteAdresse: "rgb(167, 38, 231)",
      jaAnschlussprufen: "rgb(255, 140, 42)",
      ja: "rgb(29, 155, 216)",
      nein: "rgb(0, 0, 0)",
      neinAnschlussprufen: "rgb(237, 82, 73)",
      adresse: "#903fff",
      adresseIncomplet: "amber-500",
      adresseInvalide: "purple-500",
      adresseValide: "#903fff",
    },
    MaterialCount: {
      marker_duct: "",
      iconcable_iconduct: "text-red-500",
      iconcable1_iconduct1: "text-emerald-500",
      iconcable_iconduct2: "text-sky-700",
    },
    overlayControl: {
      color: "#0E76BB",
    },
    addressPoints: {
      circlecolor: [
        "match",
        ["get", "status"],
        "1",
        "rgb(255, 140, 42)",
        "2",
        "rgb(29, 155, 216)",
        "3",
        "rgb(237, 82, 73)",
        "4",
        "rgb(0, 0, 0)",
        "5",
        "rgb(167, 38, 231)",
        "6",
        "rgb(112, 173, 70)",
        "#000000",
      ],
      layercircle: "#0E76BB",
    },
    datatiles: {
      DistributionCables: "orange",
      FeederCables: "purple",
      PrimDistributionCables: "blue",
      allothercables: "yellow",
    },
    extraviewable: {
      NetzPlanningMarker: {
        iconssqure: "/icons/square.png",
        iconshouse: "/icons/house.png",
        iconstriangle: "/icons/triangle.png",
      },
    },
    legend: {
      legendButton: "#0092c3",
    },

    login: {
      formbg: "#FFFFFF26", // Background color with opacity
      logo: "/assets/logo.svg", // Logo path
      wellcometext: "Welcome", // Welcome text
      signintext: "Please sign in.", // Sign-in text
      bottomlogo: "/logo_TUV.svg", // Bottom logo path
    },
  },

  // -------------------   [  GIGA-FIBER CONNECT   ] -------------------- //


  gigafiberconnect: {
    GlobalConfiguration:{
      textcolor: '#903fff'
    },
    usermanagement: {
      bgcolor: "#FF5733",
      bordercolor: "#FF5733",
      textcolor: "#903FFF",
      sideimg: "./verticalbluebackground.svg",
      hoverburger: "bg-opacity-80",
      hoverbg: "bg-opacity-80",
    },
    header: {
      headtext: "#FF5733",
      headselect: "border-red-500",
      usericoncolor: "#903fff",
    },
    navbar: {
      hoverburger: "border-red-600",
      hoverbg: "brand",
      sideimg: "./verticalbluebackground.svg",
    },
    contactpage: {
      phonenumber: "0221 - 806 5700",
      textcolor: "#903FFF",
      motto: "Contacts, Training & Support",
      description:
        "Please describe your issue in detail, with any relevant information including device platform and version affected, steps taken leading to the issue, which period of time this problem is go on etc.",
      email: "support@dimconnect.com",
      image1: "/assets/icons/phone.png",
      image2: "/Group933.svg",
      image3: "/Group932.svg",
      logo: "/logo_TUV.svg",
      mobiles: "/DIMMOBILES.svg",
    },
    costinfo: {
      ICONS_COLORS: [
        "text-orange-500",
        "text-pink-500",
        "text-teal-500",
        "text-lime-500",
        "text-cyan-500",
        "text-rose-500",
        "text-fuchsia-500",
        "text-zinc-500",
      ],
      activeborder: "5px solid #FF5733",
      active: "#FF5733",
    },
    publicwrapper: {
      bgimg: "./bgimg.png",
    },
    mapelements: {
      inexistenteAdresse: "rgb(233, 30, 99)",
      jaAnschlussprufen: "rgb(255, 87, 34)",
      ja: "rgb(76, 175, 80)",
      nein: "rgb(33, 33, 33)",
      neinAnschlussprufen: "rgb(244, 67, 54)",
      adresse: "#FF9800",
      adresseIncomplet: "amber-600",
      adresseInvalide: "purple-600",
      adresseValide: "#FF9800",
    },
    MaterialCount: {
      marker_duct: "",
      iconcable_iconduct: "text-orange-500",
      iconcable1_iconduct1: "text-teal-500",
      iconcable_iconduct2: "text-indigo-700",
    },
    overlayControl: {
      color: "#FF5733",
    },
    addressPoints: {
      circlecolor: [
        "match",
        ["get", "status"],
        "1",
        "rgb(255, 87, 34)",
        "2",
        "rgb(76, 175, 80)",
        "3",
        "rgb(244, 67, 54)",
        "4",
        "rgb(33, 33, 33)",
        "5",
        "rgb(233, 30, 99)",
        "6",
        "rgb(56, 142, 60)",
        "#000000",
      ],
      layercircle: "#FF5733",
    },
    datatiles: {
      DistributionCables: "red",
      FeederCables: "cyan",
      PrimDistributionCables: "lime",
      allothercables: "pink",
    },
    extraviewable: {
      NetzPlanningMarker: {
        iconssqure: "/icons/square.png",
        iconshouse: "/icons/house.png",
        iconstriangle: "/icons/triangle.png",
      },
    },
    legend: {
      legendButton: "#E91E63",
    },
    login: {
      formbg: "#FFFFFF26",
      logo: "/assets/logo.svg",
      wellcometext: "Welcome",
      signintext: "Please sign in.",
      bottomlogo: "/logo_TUV.svg",
    },
  },
};

const urlParams = new URLSearchParams(window.location.search);
const tenantParam = urlParams.get("tenant")?.replace(/['"]/g, ""); // Remove extra quotes

// Use the specific config if tenant is found, else use default
export default tenantConfigs[tenantParam] || tenantConfigs.default;
