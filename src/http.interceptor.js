import axios from "axios";

axios.interceptors.request.use(async config => {
  if (!config.url.endsWith("auth")) {
    const userToken = await localStorage.getItem("token");
    config.headers = {
      "Cache-Control": "no-cache"
    };
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});
