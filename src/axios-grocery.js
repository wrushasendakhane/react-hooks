import axios from "axios"

const instance = axios.create({
  baseURL: "https://grocery-list-cf3ef.firebaseio.com/"
})

export default instance;