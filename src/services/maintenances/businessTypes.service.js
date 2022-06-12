import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/business-types/?populate[0]=spots");
  };

  async getOne(id) {
    return await http.get(`/api/business-types/${id}?populate[0]=spots`);
  };

  async count() {
    return await http.get("/api/business-types/count");
  };

  async create(data) {
    return await http.post("/api/business-types", data);
  }

  async update(id, data) {
    return await http.put(`/api/business-types/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/business-types/${id}`);
  }

}

export default new endpointDataService();