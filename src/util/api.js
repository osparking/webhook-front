import axios, { HttpStatusCode } from "axios";

const prefix = "http://localhost:8080/api";

export const api = axios.create({
  baseURL: prefix,
});