import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import "../globals/globals";
import { API_URL, STAGING_API_URL } from "@env";

axios.defaults.baseURL = STAGING_API_URL + "/api";

const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  async (config) => {
    config.cancelToken = new axios.CancelToken(function (cancel) {});

    const token = await AsyncStorage.getItem("@token");
    const locale = await AsyncStorage.getItem("@lang");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        Accept: "application/json",
      };
    }
    console.log(token);
    if (locale) {
      let localRegion = locale === "1" ? "en" : "ar";

      const oldUrl = config.url;
      config.url = "/" + localRegion.toLocaleLowerCase() + oldUrl;
    } else {
      const oldUrl = config.url;
      config.url = "/ar" + oldUrl;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
