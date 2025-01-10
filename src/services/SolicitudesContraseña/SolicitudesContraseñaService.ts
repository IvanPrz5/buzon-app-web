import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class SolicitudesContraseñaService extends Crud {
  constructor() {
    super("SolicitudesContraseña");
  }

  async findByIdAndUuid(id: number, uuid: string) {
    return await axios.post(this.API_URL + "/findByIdAndUuid", {
      id: id,
      uuid: uuid,
    });
  }
}
