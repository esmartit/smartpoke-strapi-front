import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/spots/?populate=%2A");
  };

  async getOne(id) {
    return await http.get(`/api/spots/${id}?populate=%2A`);
  };

  async count() {
    return await http.get("/api/spots/count");
  };

  async create(data) {
    return await http.post("/api/spots", data);
  }

  async update(id, data) {
    return await http.put(`/api/spots/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/spots/${id}`);
  }
  
}

export default new endpointDataService();