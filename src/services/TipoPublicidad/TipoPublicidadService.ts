import { Crud } from "@/services/Crud/Crud";
import axios from "axios";

export class TipoPublicidadService extends Crud {
  constructor() {
    super("TipoPublicidad");
  }

  async saveTipoPublicidad(file: any, tipoPublicidad: any) {
    const entityJson = JSON.stringify(tipoPublicidad);
    const blob = new Blob([entityJson], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("doc", blob);
    formData.append("file", file);

    return await axios.post(this.API_URL + "/saveOrUpdate", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
