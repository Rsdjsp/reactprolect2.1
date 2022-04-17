import axios from "axios";

const fetchUrl = "https://bustling-art-340914.uc.r.appspot.com";

const instance = axios.create({
  baseURL: fetchUrl,
});



const get = async (url) => {
  return await instance.get(url, {
    withCredentials: true,
  });
};
const post = async (url, data) => {
  return await instance.post(url, data, {
    withCredentials: true,
  });
};



export default instance;
export { get, post, fetchUrl};
