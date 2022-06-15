import http from "../../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/devices/?populate=%2A");
  };

  async getOne(id) {
    return await http.get(`/api/devices/${id}?populate=%2A`);
  };

  async count() {
    return await http.get("/api/devices/count");
  };

  async create(data) {
    return await http.post("/api/devices", data);
  }

  async update(id, data) {
    return await http.put(`/api/devices/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/devices/${id}`);
  }

}

export default new endpointDataService();