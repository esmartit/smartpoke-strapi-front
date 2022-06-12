import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/zip-codes/?populate[0]=city&populate[1]=city.state&populate[2]=city.state.country&populate[3]=spots");
  };

  async getOne(id) {
    return await http.get(`/api/zip-codes/${id}?populate[0]=city&populate[1]=city.state&populate[2]=city.state.country&populate[3]=spots`);
  };

  async count() {
    return await http.get("/api/zip-codes/count");
  };

  async create(data) {
    return await http.post("/api/zip-codes", data);
  }

  async update(id, data) {
    return await http.put(`/api/zip-codes/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/zip-codes/${id}`);
  }
  
}

export default new endpointDataService();