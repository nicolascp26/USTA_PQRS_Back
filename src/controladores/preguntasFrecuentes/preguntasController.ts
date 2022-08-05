import { Request, Response } from 'express';
import PreguntaDAO from '../../DAOS/preguntaDAO';
import { SQL_PREGUNTAS_FRECUENTES } from '../../consultas/preguntas_frecuentes';

class PreguntaController extends PreguntaDAO {

  public obtenerTodasPreguntas(req: Request, res: Response) {
    PreguntaController.obtenerTodas(SQL_PREGUNTAS_FRECUENTES.OBTENER_PREGUNTAS, req, res);
  }

  public obtenerPreguntaUnica(req: Request, res: Response) {
    const id = req.params.prefId;
    const params = [id];
    PreguntaController.obtenerUnica(SQL_PREGUNTAS_FRECUENTES.OBTENER_PREGUNTA_UNICA, params, res);
  }

  public crearPregunta(req: Request, res: Response) {
    const titulo = req.body.prefTitulo;
    const detalle = req.body.prefDetalle;
    const params = [titulo, detalle];
    return PreguntaController.crearPregunta(SQL_PREGUNTAS_FRECUENTES.CREAR_PREGUNTA, params, res);
  }

  public eliminarPregunta(req: Request, res: Response) {
    const id = req.params.prefId;
    const params = [id];
    PreguntaController.eliminarPregunta(SQL_PREGUNTAS_FRECUENTES.ELIMINAR_PREGUNTA, params, res);
  }

  public actualizarPregunta(req: Request, res: Response) {
    const id = req.params.prefId;
    const titulo = req.body.prefTitulo;
    const detalle = req.body.prefDetalle;
    const params = [id, titulo, detalle];
    PreguntaController.actualizarPregunta(SQL_PREGUNTAS_FRECUENTES.ACTUALIZAR_PREGUNTA, params, res);
  }

}

const preguntaController = new PreguntaController();
export default preguntaController;
