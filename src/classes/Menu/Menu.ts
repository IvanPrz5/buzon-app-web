import type { Area } from "../Area/Area";

export class Menu {
    id: number;
    nombre: string;
    descripcion: string;
    ruta: string;
    //icon: string;
    color : string;
    orden: number;
    status: boolean;
    idMenuRelacion: Menu;
    idArea: Area;
    idIcon: any;
}