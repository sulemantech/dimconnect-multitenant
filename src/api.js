import axios from "axios";
import appConfig from "./config/appConfig";

const api = axios.create({
    baseURL: appConfig.backendUrl,
});

export default api;

const routes = {
    auth : "/auth",
    district : "/district",
    materialCount : "/materialCount",
    style : "/style",
    tiles : "/tiles",
}
export const AuthAttributes = ["username","email","userRole","password"]
export const getAuth = () => api.get(`${routes.auth}/`)
export const postAuth = (email,password) => api.post(`${routes.auth}/`,{email,password})
export const postAuthRegister = (email,password,firstname,userRole) => api.post(`${routes.auth}/register`)
export const getDistrictById = () => api.get(`${routes.district}/${id}`)
export const getMaterialCountByDistrictId = (districtId) => api.get(`${routes.materialCount}/${districtId}`)
export const postStyle = () => api.post(`${routes.style}/`)
export const getTiles = () => api.get(`${routes.tiles}/`)

