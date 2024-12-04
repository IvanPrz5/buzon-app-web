import axios from "axios";

export class Crud {
  API_URL: string;

  constructor(nameComponent: string) {
    this.API_URL = "http://localhost:8095/api/v1/" + nameComponent;
  }

  async findAllByEstatus() {
    // params = pagination configuration
    return await axios.get(this.API_URL + "/findAllByStatus");
  }

  async findByIdAndEstatus(id: number) {
    // params = pagination configuration
    return await axios.get(this.API_URL + "/findByIdAndStatus/" + id);
  }

  async save(obj: any) {
    return await axios.post(this.API_URL + "/save", obj);
  }

  async update(obj: any) {
    return await axios.put(this.API_URL + "/update/" + obj.id, obj);
  }
}
