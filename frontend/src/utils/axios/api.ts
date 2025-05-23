import axios from "axios";

export default axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
})