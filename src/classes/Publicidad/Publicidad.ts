import type { TipoPublicidad } from "../TipoPublicidad/TipoPublicidad";
import type { Usuario } from "../Usuarios/Usuarios";

export class Publicidad {
    id: number;
    titulo: string;
    subTitulos: string;
    descripcion: string;
    inicio: string;
    fin: string;
    status: boolean;
    fotos: any;
    idUsuario: Usuario;
    idTipoPublicidad: TipoPublicidad;
    fotosPublicidadList: [];
}