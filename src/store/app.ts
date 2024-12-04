import type { Menu } from "@/classes/Menu/Menu";
import type { Usuario } from "@/classes/Usuarios/Usuarios";
import { defineStore } from "pinia";

export const storeApp = defineStore("app", {
  state: () => {
    return {
      usuario: null as Usuario | null,
      drawerState: false,
      theme: '',
      menu: null as Menu | null,
    };
  },

  actions: {
    setUsuarioState(data: Usuario) {
      this.usuario = data;
    },
    setDrawerState(state: boolean) {
      this.drawerState = state;
    },
    setThemeState(data: string){
      this.theme = data;
    },
    setMenuState(menu: Menu) {
      this.menu = menu;
    },
  },
});
