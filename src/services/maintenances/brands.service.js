import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/brands");
  };

  async getOne(id) {
    return await http.get(`/api/brands/${id}`);
  };

  async count() {
    return await http.get("/api/brands/count");
  };

  async create(data) {
    return await http.post("/api/brands", data);
  }

  async update(id, data) {
    return await http.put(`/api/brands/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/brands/${id}`);
  }

}

export default new endpointDataService();