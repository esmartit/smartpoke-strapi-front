import axios from "axios";
import { AuthHeader } from "./_spjwt/_sphelpers";

export default axios.create({
    baseUrl: "http://localhost:3000",
    headers: { ...{ "Content-type": "application/json" }, ...AuthHeader() }
})