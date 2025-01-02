import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class CalleService extends Crud {
  constructor() {
    super("Calle");
  }

  async generateCodigo(id: number){
    return await axios.get(this.API_URL + '/generateCodigo/' + id)
  }
}
