import { Router } from 'express';
import anexoController from '../controladores/anexos/anexoController';
import uploadFile from '../middleware/multer';

class AnexosRutas {
  public router: Router;
  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.post('/uploadFile', uploadFile(),anexoController.subirAnexo);
    this.router.get('/getFiles/:mensajeId',anexoController.obtenerAnexos);
  }
}

const anexosRutas = new AnexosRutas();
export default anexosRutas.router;
