import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class EstacionamientoUsoService extends Crud {
  constructor() {
    super("EstacionamientoUso");
  }

  async busqueda(placas: string) {
    const obj = {
      placas: placas,
    };
    return await axios.post(this.API_URL + "/busquedaByPlacas", obj);
  }
}
