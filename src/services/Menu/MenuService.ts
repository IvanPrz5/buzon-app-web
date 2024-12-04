import axios from "axios";
import { Crud } from "@/services/Crud/Crud";

export class MenuService extends Crud {
  constructor() {
    super("Menu");
  }

  async findSubMenusByIdMenuRelacion(id: number){
    return await axios.get(this.API_URL + "/findSubMenusByIdMenuRelacion/" + id)
  }
}
