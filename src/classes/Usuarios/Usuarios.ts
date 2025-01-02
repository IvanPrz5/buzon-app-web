import type { TipoUsuario } from "../TipoUsuario/TipoUsuario";

export class Usuario {
    id: number;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    username: string;
    email: string;
    celular: string
    password: string;
    status: boolean;
    idTipoUsuario: TipoUsuario;
    role: any[];
}