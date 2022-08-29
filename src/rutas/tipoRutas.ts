import { Router } from 'express';
import tipoController from '../controladores/tipo/tipoController';
import { verifyToken, isAdmin } from "../middleware/authentication";

class TipoRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getAll', verifyToken, tipoController.obtenerTodosTipos);
    this.router.delete('/delete/:tipoId', [verifyToken, isAdmin], tipoController.eliminarTipo);
    this.router.post('/create', [verifyToken, isAdmin], tipoController.crearTipo);
    this.router.put('/update/:tipoId', [verifyToken, isAdmin], tipoController.actualizarTipo);
  }
}

const rutasTipo = new TipoRutas();
export default rutasTipo.router;
