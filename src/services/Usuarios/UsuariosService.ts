import axios from "axios";
import { Crud } from "@/services/Crud/Crud";

export class UsuariosService extends Crud {
  constructor() {
    super("Usuarios");
  }

  async findAll() {
    return await axios.get(this.API_URL + "/findAll");
  }
}
