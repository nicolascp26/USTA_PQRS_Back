import { Router } from 'express';
import tipoController from '../controladores/tipo/tipoController';

class TipoRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getAll', tipoController.obtenerTodosTipos);
    this.router.delete('/delete/:tipoId', tipoController.eliminarTipo);
    this.router.post('/create', tipoController.crearTipo);
    this.router.put('/update/:tipoId', tipoController.actualizarTipo);
  }
}

const rutasTipo = new TipoRutas();
export default rutasTipo.router;
