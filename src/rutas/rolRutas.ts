import { Router } from 'express';
import rolController from '../controladores/roles/rolController';
import { verifyToken } from "../middleware/authentication";

class RolRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getAll', verifyToken, rolController.obtenerTodosRoles);
  }
}

const rutasRol = new RolRutas();
export default rutasRol.router;
