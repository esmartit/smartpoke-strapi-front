import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/zones/?populate=%2A");
  };

  async getOne(id) {
    return await http.get(`/api/zones/${id}?populate=%2A`);
  };

  async count() {
    return await http.get("/api/zones/count");
  };

  async create(data) {
    return await http.post("/api/zones", data);
  }

  async update(id, data) {
    return await http.put(`/api/zones/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/zones/${id}`);
  }
  
}

export default new endpointDataService();