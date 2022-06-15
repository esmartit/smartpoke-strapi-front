import http from "../../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/cities/?populate[0]=state&populate[1]=state.country&populate[2]=zip_codes&populate[3]=spots");
  };

  async getOne(id) {
    return await http.get(`/api/cities/${id}?populate[0]=state&populate[1]=state.country&populate[2]=zip_codes&populate[3]=spots`);
  };
  
  async count() {
    return await http.get("/api/cities/count");
  };

  async create(data) {
    return await http.post("/api/cities", data);
  }

  async update(id, data) {
    return await http.put(`/api/cities/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/cities/${id}`);
  }
  
}

export default new endpointDataService();