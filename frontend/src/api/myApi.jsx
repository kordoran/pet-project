import axios from "axios";

export const myApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 3000,
  });

  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      console.log("RESPONSE DATA:", response.data);
      return response;
    } catch (err) {
      console.log("Error status:", err.response?.status);
      console.log("Error data: ", err.response?.data);
      return err.response;
    }
  };

  const get = async (path) => {
    try {
      const resp = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return resp;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  return { post, get, _instance: instance };
};
