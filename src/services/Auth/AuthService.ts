import axios from "axios";
import { Crud } from "@/services/Crud/Crud";
import type { Usuario } from "@/classes/Usuarios/Usuarios";

export class AuthService extends Crud {
  constructor() {
    super("Auth");
  }

  async login(credentials: Usuario) {
    return await axios.post(this.API_URL + "/loginUserAdmin", credentials);
  }

  async register(credentials: Usuario) {
    return await axios.post(this.API_URL + "/register", credentials);
  }

  async generarSolicitudCambioPassword(email: string) {
    return await axios.post(this.API_URL + "/generarSolicitudCambioPassword", {
      email: email,
    });
  }

  async cambiarContrasenia(idUsuario: number, idSolicitud: number, newPassword: string) {
    return await axios.put(this.API_URL + "/cambiarContrasenia", {
      idUsuario: idUsuario, 
      idSolicitud: idSolicitud,
      password: newPassword,
    });
  }
}
