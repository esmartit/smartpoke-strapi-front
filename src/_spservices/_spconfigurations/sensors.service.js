import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/sensors/?populate[0]=zone&populate[1]=spot&populate[2]=spot.country&populate[3]=spot.state&populate[4]=spot.city&populate[5]=spot.zip_code&populate[6]=zone");
  };

  async getOne(id) {
    return await http.get(`/api/sensors/${id}?populate[0]=zone&populate[1]=spot&populate[2]=spot.country&populate[3]=spot.state&populate[4]=spot.city&populate[5]=spot.zip_code&populate[6]=zone`);
  };

  async count() {
    return await http.get("/api/sensors/count");
  };

  async create(data) {
    return await http.post("/api/sensors", data);
  }

  async update(id, data) {
    return await http.put(`/api/sensors/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/sensors/${id}`);
  }

}

export default new endpointDataService();