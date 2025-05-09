import axios from "axios";
import { Crud } from "@/services/Crud/Crud";

export class PublicidadService extends Crud {
  constructor() {
    super("Publicidad");
  }
  async findAllByStatusAndIdUsuario(idUsuario: number){
    return await axios.get(this.API_URL + "/findAllByStatusAndIdUsuario/" + idUsuario);
  }

  async findByIdAndEstatusAndIdUsuario(idPublicidad: number | string, idUsuario: number){
    return await axios.get(this.API_URL + "/findByIdAndStatusAndIdUsuario/" + idPublicidad + "/" + idUsuario)
  }

  async findAllByStatus(){
    return await axios.get(this.API_URL + "/findAllByFechasAndStatus");
  }
}
