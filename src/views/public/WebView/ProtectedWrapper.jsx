import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "preact/hooks";
import api, { getCurrentUserPermissions } from "../../../api";
import appConfig from "../../../config/appConfig";
import { permissible } from "../../../signals";

import Cookies from 'js-cookie';

const AuthWrapper = ({ children }) => {
  const queryParam = new URLSearchParams(window.location.search);
  const token = queryParam.get("token");

  useEffect(() => {
    const authenticateUser = async () => {
      if (token) {
        try {
          api.defaults.headers.common["authorization"] = `Bearer ${token}`;
          //localStorage.setItem(appConfig.localStorageKeyWebview, token);
          Cookies.set(appConfig.localStorageKeyWebview, token);

          const { data } = await getCurrentUserPermissions();

          permissible.value = permissible.value.map((p) => {
            const index = data.accessList.findIndex((a) => a.activity === p.activity);
            return index !== -1 ? data.accessList[index] : p;
          });
        } catch (err) {
          // Handle error if needed
        }
      }
    };

    authenticateUser();
  }, [token]);

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  return <>{isAuthenticated ? children : <LoadingOverlay visible />}</>;
};

export default AuthWrapper;
