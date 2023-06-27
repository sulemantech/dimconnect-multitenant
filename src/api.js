import axios from "axios";
import appConfig from "./config/appConfig";

const api = axios.create({
    baseURL: appConfig.backendUrl,
});

export default api;

const routes = {
    auth: "/auth",
    district: "/district",
    dashboard: "/dashboard",
    style: "/style",
    tiles: "/tiles",
    ticket: "/tickets",
}
export const AuthAttributes = ["username", "email", "userRole", "password"]
export const getAuth = () => api.get(`${routes.auth}/`)
export const postAuth = (email, password) => api.post(`${routes.auth}/`, { email, password })
export const refreshAuth = (refreshToken) => api.post(`${routes.auth}/refresh`, { refreshToken })
export const postAuthRegister = (email, password, firstname, userRole) => api.post(`${routes.auth}/register`)
export const getDistrictById = () => api.get(`${routes.district}/${id}`)
export const getMaterialCountByDistrictId = (districtId) => api.get(`${routes.dashboard}/materialCount/${districtId}`)
export const getCostInfoByDistrictId = (districtId,body) => api.post(`${routes.dashboard}/cost/${districtId}`,body)
export const postStyle = () => api.post(`${routes.style}/`)
export const getTiles = () => api.get(`${routes.tiles}/`)
export const getAddressPointStatus = (districtId) => api.get(`/address/${districtId}`)
export const getPhotos = (districtId) => api.get(`/photo/${districtId}`)
export const getGPXList = (districtId) => api.get(`/gpx/list/${districtId}`)
export const getGPX = (gpxId) => api.get(`/gpx/${gpxId}`)
export const getAddressPointCount = (districtId) => api.get(`/address/count/${districtId}`)
export const getnetzplanning = (districtId) => api.get(`/netzplanning/${districtId}`)
export const getDistrictPhase = () => api.get(`/DistrictPhase`)
export const postAddressPoint = (districtId, data) => api.post(`/address/new/${districtId}`, data)
export const getAddressPointDetails = (districtId, pointId) => api.get(`/address/single/${districtId}/${pointId}`)
export const updateAddressPoint = (districtId, pointId, data) => api.post(`/address/update/${districtId}/${pointId}`, data)

export const getUsers = () => api.get(`/user`)
export const createUser = (data) => api.post(`/user`, data)
export const deleteUser = (id) => api.delete(`/user/${id}`)
export const editUser = (id, data) => api.put(`/user/${id}`, data)
let usersdata = []
export const getUserById = {
    findUserById : (id) => {
        return usersdata.find(user => user.id === id)
    },
    assignData : (data) => {
        usersdata = data
    }
}

export const getPermissions = () => api.get(`/permissions`)
export const createPermission = (data, title) => api.post(`/permissions/${title}`, data)
export const deletePermission = (id) => api.delete(`/permissions/${id}`)
export const editPermission = (id, data) => api.put(`/permissions/${id}`, data)


export const getAccessList = (roleId) => api.get(`/permission/accesslist/${roleId}`)

export const getRoles = () => api.get(`/roles`)
export const createRole = (data) => api.post(`/roles`, data)
export const deleteRole = (id) => api.delete(`/roles/${id}`)
export const editRole = (id, data) => api.put(`/roles/${id}`, data)

// permission/current-user/all
export const getCurrentUserPermissions = () => api.get(`/permission/current-user/all`) 
// 

// POST: roles/with-permissions
export const createRoleWithPermissions = (data) => api.post(`/roles/with-permissions`, data)



export const assignRolesToUser = (userId, data) => api.post(`/user/assign-roles/${userId}`, data)


export const getRegionList = () => api.get(`/region/list`)
export const getRegionListByAGS = (ags) => api.get(`/region/list/${ags}`)
export const getBoundaries = (districtId) => api.get(`netzplanning/boundries/${districtId}`)
export const getEquipment = (districtId,minX, minY, maxX, maxY) => api.get(`netzplanning/point-lookup/${districtId}/${minX}/${minY}/${maxX}/${maxY}`)

export const getAllTickets = () => api.get(`${routes.ticket}/all`)
// tickets
export const getTicketsCategories = () => api.get(`/ticketcategory/all`)
export const getTicketPriorities = () => api.get(`/ticketpriority/all`)
export const postTicket = (data) => api.post(`/tickets`, data)

export const getFAQs = (auth) => api.get(`/faqs?auth=${auth}`)
export const getTickets = (id) => api.get(`/tickets/${id}`)