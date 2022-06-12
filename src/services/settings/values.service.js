import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/values/?populate=%2A");
  };

  async getOne(id) {
    return await http.get(`/api/values/${id}?populate=%2A`);
  };

  async count() {
    return await http.get("/api/values/count");
  };

  async create(data) {
    return await http.post("/api/values", data);
  }

  async update(id, data) {
    return await http.put(`/api/values/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/values/${id}`);
  }

}

export default new endpointDataService();