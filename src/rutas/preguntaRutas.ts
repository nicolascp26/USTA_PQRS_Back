import { Router } from 'express';
import preguntaController from '../controladores/preguntasFrecuentes/preguntasController';

class PreguntaRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getAll', preguntaController.obtenerTodosPreguntaes);
    this.router.delete('/delete/:prefId', preguntaController.eliminarPregunta);
    this.router.post('/create', preguntaController.crearPregunta);
    this.router.put('/update/:prefId', preguntaController.actualizarPregunta);
  }
}

const rutasPregunta = new PreguntaRutas();
export default rutasPregunta.router;
