import { Router } from 'express';
import miRolControlador from '../controladores/roles/rolController';

class RolRutas {
  public router: Router;
  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getrole', miRolControlador.obtenerRoles);
  }
}

const rutasRol = new RolRutas();
export default rutasRol.router;
