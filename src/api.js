import axios from "axios";
import appConfig from "./config/appConfig";

const api = axios.create({
    baseURL: appConfig.backendUrl,
});

export default api;

const routes = {
    auth : "/auth",
    district : "/district",
    dashboard : "/dashboard",
    style : "/style",
    tiles : "/tiles",
}
export const AuthAttributes = ["username","email","userRole","password"]
export const getAuth = () => api.get(`${routes.auth}/`)
export const postAuth = (email,password) => api.post(`${routes.auth}/`,{email,password})
export const postAuthRegister = (email,password,firstname,userRole) => api.post(`${routes.auth}/register`)
export const getDistrictById = () => api.get(`${routes.district}/${id}`)
export const getMaterialCountByDistrictId = (districtId) => api.get(`${routes.dashboard}/materialCount/${districtId}`)
export const getCostInfoByDistrictId = (districtId) => api.get(`${routes.dashboard}/costInfo/${districtId}`)
export const postStyle = () => api.post(`${routes.style}/`)
export const getTiles = () => api.get(`${routes.tiles}/`)
export const getAddressPointStatus = (districtId) => api.get(`/address/${districtId}`)
export const getPhotos = (districtId) => api.get(`/photo/${districtId}`)
export const getGPXList = (districtId) => api.get(`/gpx/list/${districtId}`)
export const getGPX = (gpxId) => api.get(`/gpx/${gpxId}`)