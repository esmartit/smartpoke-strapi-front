import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/hot-spots/?populate=%2A");
  };

  async getOne(id) {
    return await http.get(`/api/hot-spots/${id}?populate=%2A`);
  };

  async count() {
    return await http.get("/api/hot-spots/count");
  };

  async create(data) {
    return await http.post("/api/hot-spots", data);
  }

  async update(id, data) {
    return await http.put(`/api/hot-spots/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/hot-spots/${id}`);
  }
  
}

export default new endpointDataService();