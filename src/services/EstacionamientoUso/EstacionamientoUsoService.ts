import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class EstacionamientoUsoService extends Crud {
  constructor() {
    super("EstacionamientoUso");
  }

  async busqueda(placas: string) {
    return await axios.get(this.API_URL + '/busqueda/' + placas);
  }
}
