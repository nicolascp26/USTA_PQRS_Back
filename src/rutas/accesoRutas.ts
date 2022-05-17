import { Router } from 'express';
import accesoController from '../controladores/acceso/accesoController';

class AccesoRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.router.post('/login', accesoController.iniciar);
  }
}
const accesoRutas = new AccesoRutas();
export default accesoRutas.router;
