import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/customers/?populate[0]=hot_spot&populate[1]=hot_spot.spot");
  };

  async getOne(id) {
    return await http.get(`/api/customers/${id}?populate[0]=hot_spot&populate[1]=hot_spot.spot`);
  };

  async count() {
    return await http.get("/api/customers/count");
  };

  async create(data) {
    return await http.post("/api/customers", data);
  }

  async update(id, data) {
    return await http.put(`/api/customers/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/customers/${id}`);
  }

}

export default new endpointDataService();