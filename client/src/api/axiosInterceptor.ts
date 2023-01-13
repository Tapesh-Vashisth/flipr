import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import axiosInstance from "./axios";
import { userActions } from "../features/user/userSlice";

const setup = (store: ToolkitStore) => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const token = store.getState().user.accessToken;
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.get("/auth/refreshtoken");

            const { accessToken } = rs.data;

            dispatch(userActions.setAccessToken(accessToken));

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;