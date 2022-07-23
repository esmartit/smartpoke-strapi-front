import http from "../../http-common";

class endpointDataService {

  async getAll(sort='') {
    return await http.get(`/api/campaigns/?populate=%2A&${sort}`);
  };

  async getOne(id, data) {
    return await http.put(`/api/campaigns/${id}?populate=%2A`);
  }

  async count() {
    return await http.get("/api/campaigns/count");
  };

  async create(data) {
    return await http.post("/api/campaigns", data);
  }

  async update(id, data) {
    return await http.put(`/api/campaigns/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/campaigns/${id}`);
  }

}

export default new endpointDataService();