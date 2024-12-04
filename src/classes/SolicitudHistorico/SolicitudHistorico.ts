import type { Estatus } from "../Estatus/Estatus";
import type { Usuario } from "../Usuarios/Usuarios";

export class SolicitudHistorico {
    id: number;
    descripcion: string;
    fechaRegistro: string;
    idUsuario: Usuario;
    idSolicitud: any;
    idEstatus: Estatus;
    fotosHistoricoList: any;
}