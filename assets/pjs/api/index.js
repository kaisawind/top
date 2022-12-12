export const GetIP = () => {
  return axios.get(`https://api.ipify.org/?format=json`)
};