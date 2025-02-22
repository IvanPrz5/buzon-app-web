import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class CalleService extends Crud {
  constructor() {
    super("Calle");
  }

  async generateCodigo(id: number) {
    return await axios
      .get(this.API_URL + "/generateCodigo/" + id, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "codigo.png");
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}
