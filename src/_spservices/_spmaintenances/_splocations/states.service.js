import http from "../../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/states/?populate[0]=country&populate[1]=cities&populate[2]=spots");
  };

  async getOne(id) {
    return await http.get(`/api/states/${id}?populate[0]=country&populate[1]=cities&populate[2]=spots`);
  };
  
  async getByCountry(id) {
    if (id === '') {
      return await http.get("/api/states/?populate[0]=country&populate[1]=cities&populate[2]=spots");
    } else {
      return await http.get(`/api/states/?populate[country][filters][id][$eq]=${id}`);
    }
  };

  async count() {
    return await http.get("/api/states/count");
  };

  async create(data) {
    return await http.post("/api/states", data);
  }

  async update(id, data) {
    return await http.put(`/api/states/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/states/${id}`);
  }
  
}

export default new endpointDataService();