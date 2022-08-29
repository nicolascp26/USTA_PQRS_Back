import { Router } from 'express';
import accesoController from '../controladores/acceso/accesoController';
import { verifyToken } from "../middleware/authentication";

class AccesoRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.router.post('/login', accesoController.iniciar);
    this.router.put('/updatePassword/:usuarioId', verifyToken, accesoController.actualizarClave);
  }
}
const accesoRutas = new AccesoRutas();
export default accesoRutas.router;
