import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
export default axios.create({
  baseURL: proxyurl + `https://dev-api.agentz.ai/`,//YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  }
});
