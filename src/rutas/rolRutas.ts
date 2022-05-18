import { Router } from 'express';
import rolController from '../controladores/roles/rolController';

class RolRutas {
  public router:Router;

  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getAll', rolController.obtenerTodosRoles);
    this.router.delete('/delete/:rolID',rolController.eliminarUnRol);
  }
}

const rutasRol = new RolRutas();
export default rutasRol.router;
