import axios from "axios";
import {Crud} from "@/services/Crud/Crud";
import type { Usuario } from "@/classes/Usuarios/Usuarios";

export class AuthService extends Crud {
    constructor() {
        super("Auth");
    }

    async login(credentials: Usuario){
        return await axios.post(this.API_URL + "/login", credentials)
    }

    async register(credentials: Usuario){
        return await axios.post(this.API_URL + "/register", credentials)
    }
}