//import axios from "axios";
import { Crud } from "@/services/Crud/Crud";

export class AreaService extends Crud {
  constructor() {
    super("Area");
  }

/*   async findSubMenusByIdMenuRelacion(id: number){
    return await axios.get(this.API_URL + "/findSubMenusByIdMenuRelacion/" + id)
  } */
}
