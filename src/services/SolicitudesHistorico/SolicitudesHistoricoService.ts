import {Crud} from "@/services/Crud/Crud";
import axios from "axios";

export class SolicitudesHistoricoService extends Crud {
    constructor() {
        super("SolicitudesHistorico");
    }

    async findByIdSolicitud(idSolicitud: number){
        return await axios.get(this.API_URL + "/findByIdSolicitud/" + idSolicitud);
    }
}