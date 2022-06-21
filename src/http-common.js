import axios from "axios";
import { AuthHeader } from "./jwt/_helpers";

export default axios.create({
    baseUrl: "/",
    headers: { ...{ "Content-type": "application/json" }, ...AuthHeader() }
})