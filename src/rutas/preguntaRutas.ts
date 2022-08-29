import { Router } from 'express';
import preguntaController from '../controladores/preguntasFrecuentes/preguntasController';
import { verifyToken, isAdmin } from "../middleware/authentication";

class PreguntaRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.get('/getAll', preguntaController.obtenerTodasPreguntas);
    this.router.get('/getSingle/:prefId', preguntaController.obtenerPreguntaUnica);
    this.router.delete('/delete/:prefId', [verifyToken, isAdmin], preguntaController.eliminarPregunta);
    this.router.post('/create', verifyToken, preguntaController.crearPregunta);
    this.router.put('/update/:prefId', verifyToken, preguntaController.actualizarPregunta);
  }
}

const rutasPregunta = new PreguntaRutas();
export default rutasPregunta.router;
