import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class UsuarioRolService extends Crud {
  constructor() {
    super("UsuarioRol");
  }

  async getRolesByUsuario(id: number){
    return await axios.get(this.API_URL + "/getRolesByUsuario/" + id)
  }

  async quitarRol(item: any){
    return await axios.put(this.API_URL + "/quitarRol", item)
  }
}