import { signal } from "@preact/signals";
// check if url has ags query param
const urlParams = new URLSearchParams(window.location.search);
const ags = urlParams.get("ags");
export const dropvalue = signal(ags ? ags : "NULL");

export const districts = signal({});
export const mapClickBindings = signal({});
export const collapsed = signal(false);
export const costInfoData = signal(null);
export const userDataSignal = signal(null);
export const regsionListSignal = signal([]);
export const permissible = signal([
  {
    activity: "Dashboard",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "Administration",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "User Management",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "Roles Management",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "Map",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "AddressPoint",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "Photo",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "Video",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "Ticket",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "FAQ",
    add: false,
    view: false,
    edit: false,
    delete: false,
  },
  {
    activity: "RaiseTicket",
    add: true,
    view: true,
    edit: true,
    delete: true,
  },
  {
    activity: "ReplyTicket",
    add: true,
    view: true,
    edit: true,
    delete: true,
  },
  {
    activity: "SupportTeam",
    add: true,
    view: true,
    edit: true,
    delete: true,
  },
]);

export const UserType = signal("admin");



export const aerialViewVisibility = signal(false);
export const PRpropertiesVisibility = signal(false);
export const addressPointsVisibility = signal(true);
export const addressPointsReceived = signal(false);
export const addressPointsStatusVisibility = signal({
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
});
export const netzplanning = signal({
  5: true,
  6: true,
  10: true,
});

export const legendState = signal(true);


export const addressPointsCRUDstate = signal("");
export const visibility = signal(null);
export const photoVisibility = signal(true);

export const mapStyle = signal(
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
);
export const mapSignal = signal(null);
export const additionalInteractiveLayers = signal(["addressPoints"]);

// ja (Anschluss prüfen)	                 rgb(255, 140, 42);
// ja	                                                 rgb(29, 155, 216);
// nein (Anschluss geprüft)	         rgb(237, 82, 73);
// nein	                                                 rgb(0, 0, 0);
// inexistente Adresse	                 rgb(167, 38, 231);
// Schon bearbeitet	                         rgb(112, 173, 70);
export const legendContent = signal({
  "ja (Anschluss prüfen)": {
    color: "rgb(255, 140, 42)",
    type: "point",
    code: 1,
  },
  ja: {
    color: "rgb(29, 155, 216)",
    type: "point",
    code: 2,
  },
  "nein (Anschluss geprüft)": {
    color: "rgb(237, 82, 73)",
    type: "point",
    code: 3,
  },
  nein: {
    color: "rgb(0, 0, 0)",
    type: "point",
    code: 4,
  },
  "inexistente Adresse": {
    color: "rgb(167, 38, 231)",
    type: "point",
    code: 5,
  },
});

export const netzplanninglegend = signal({
  Status: {
    "Finalisierung Netzdetailplanung": {
      color: "orange",
      type: "point",
      code: 1,
      key: "Finalisierung Netzdetailplanung durch TRC",
    },
    "noch keine Phase begonnen": {
      color: "#808080",
      type: "point",
      code: 2,
      key: "Noch nicht begonnen",
    },
    "in Bearbeitung, s. Phasen": {
      color: "#ffeb9c",
      type: "point",
      code: 3,
      key: "NPV: Netzplanaufbereitung durch TRC",
    },
    "alle Phasen abgeschlossen": {
      color: "#c6efce",
      type: "point",
      code: 4,
      key: "Abgeschlossen",
    },
  },
  // "Bearbeitungsphasen": {
  //     'Onboarding': {
  //         symbol: '1',
  //     },
  //     'APV: Validierung durch TRC': {
  //         symbol: '2',
  //     },
  //     'APV: Validierung durch Kommune': {
  //         symbol: '3',
  //     },
  //     'NPV: Netzplanaufbereitung durch TRC': {
  //         symbol: '4',
  //     },
  //     'NPV: Netzplanaufbereitung durch Kommune': {
  //         symbol: '5',
  //     },
  //     'Finalisierung Netzdetailplanung durch TRC': {
  //         symbol: '6',
  //     },
  //     'Finalisierung Netzdetailplanung durch Kommune': {
  //         symbol: '7',
  //     },
  // }
});

export const DistrictPhaseVisibility = signal(false);
export const DistrictPhaseLayersVisibility = signal({
  "Finalisierung Netzdetailplanung durch TRC": true,
  Abgeschlossen: true,
  "Noch nicht begonnen": true,
  "NPV: Netzplanaufbereitung durch TRC": true,
});

export const editControlLoading = signal(false);

export const videoVisibility = signal(true);

export const infoCardVal = signal(null);

export const BarrierState = signal(false);
export const roadandwaterstate = signal(false);
// export const equipmentState = signal(false)

export const costInputParams = signal({
  cables: {
    distribution: {
      materialCost: 9,
      labourCost: 1,
    },
    feeder: {
      materialCost: 8.09,
      labourCost: 8.09,
    },
    primary: {
      materialCost: 8.09,
      labourCost: 8.09,
    },
  },
  duct: {
    distribution: {
      materialCost: 8.09,
      labourCost: 8.09,
    },
    feeder: {
      materialCost: 8.09,
      labourCost: 8.09,
    },
    primary: {
      materialCost: 8.09,
      labourCost: 8.09,
    },
  },
  homeActivation: {
    building: {
      greaterMaterialCost: 8.09,
      greaterLabourCost: 8.09,
      lowerMaterialCost: 8.09,
      lowerLabourCost: 8.09,
    },
    home: {
      greaterMaterialCost: 8.09,
      greaterLabourCost: 8.09,
      lowerMaterialCost: 8.09,
      lowerLabourCost: 8.09,
    },
  },
});

export const regionCostState = signal(false);
export const FAQState = signal([]);