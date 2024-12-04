import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class UsuarioAreaService extends Crud {
  constructor() {
    super("UsuarioArea");
  }

  async findAllByUsuarioAndStatus(id: number) {
    return await axios.get(this.API_URL + "/findAllByUsuarioAndStatus/" + id);
  }

  async saveUsuarioAreas(id: number, item: any){
    return await axios.post(this.API_URL + "/saveUsuarioAreas/" + id, item)
  }
}
