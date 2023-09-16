import axios from "axios"

export const server = axios.create({
  baseURL: "http://localhost:3333", // URL do servidor
})
