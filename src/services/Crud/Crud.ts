import axios from "axios";

export class Crud {
  API_URL: string;

  constructor(nameComponent: string) {
    this.API_URL = 'https://api-atencion.sofim.com.mx/buzon-app-0.0.1-SNAPSHOT/api/v1/' + nameComponent;
    //this.API_URL = 'http://172.16.50.162:8095/api/v1/' + nameComponent;
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
