import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class UsuarioAreaService extends Crud {
  constructor() {
    super("UsuarioArea");
  }

  async findAllByUsuarioAndStatus(id: number) {
    return await axios.get(this.API_URL + "/findAllByUsuarioAndStatus/" + id);
  }

  async saveUsuarioAreas(obj: any){
    return await axios.post(this.API_URL + "/saveUsuarioAreas", obj)
  }

  quitarArea(item: any){
    return axios.put(this.API_URL + "/quitarArea", item);
  }
}
