import { Crud } from "@/services/Crud/Crud";

export class RolesService extends Crud {
  constructor() {
    super("Roles");
  }
}