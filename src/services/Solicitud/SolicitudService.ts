import {Crud} from "@/services/Crud/Crud";
import axios from "axios";

export class SolicitudService extends Crud {
    constructor() {
        super("Solicitud");
    }

    async findAllByIdUsuarioAndIdEstatusAndIdAreaAndStatus(idUsuario: number, idEstatus: number, idArea: number){
        return await axios.get(this.API_URL + "/findAllByIdUsuarioAndIdAreaAndStatus/" + idUsuario + "/" + idEstatus + "/" + idArea);
    }
}