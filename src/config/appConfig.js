export default {
    appName: 'HiWiFi',
    appVersion: '1.0.0',
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    mediaServerURL: import.meta.env.VITE_MEDIA_SERVER_URL,
    localStorageKey: import.meta.env.VITE_LOCAL_STORAGE_KEY,
    localStorageKeyWebview: import.meta.env.VITE_LOCAL_STORAGE_KEY_WEB_VIEW,
    localStorageRefreshKey: import.meta.env.VITE_LOCAL_STORAGE_REFRESH_KEY,
    chatServerURL: import.meta.env.VITE_CHAT_SERVER_URL,
    chatServerWebSocketURL: import.meta.env.VITE_CHAT_SERVER_WEB_SOCKET_URL,
    chatServerAdminUsername: import.meta.env.VITE_CHAT_SERVER_ADMIN_USER_NAME,
    chatServerAdminPassword: import.meta.env.VITE_CHAT_SERVER_ADMIN_PASSWORD,
};