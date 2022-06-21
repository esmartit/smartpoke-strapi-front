import http from "../../http-common";

class endpointDataService {

  async getJWT(data) {
    return await http.post("/api/auth/local/", data);
  };
}

export default new endpointDataService();