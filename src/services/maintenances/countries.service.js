import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/countries/?populate[0]=states&populate[1]=states.cities&populate[2]=states.cities.zip_codes&populate[3]=spots");
  };

  async getOne(id) {
    return await http.get(`/api/countries/${id}?populate[0]=states&populate[1]=states.cities&populate[2]=states.cities.zip_codes&populate[3]=spots`);
  };

  async count() {
    return await http.get("/api/countries/count");
  };

  async create(data) {
    return await http.post("/api/countries", data);
  }

  async update(id, data) {
    return await http.put(`/api/countries/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/countries/${id}`);
  }

}

export default new endpointDataService();