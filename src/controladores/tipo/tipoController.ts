import { Request, Response } from 'express';
import TipoDAO from '../../DAOS/tipoDAO';
import { SQL_TIPOS } from '../../consultas/tipos_mensajes_sql';

class TipoController extends TipoDAO {

  public obtenerTodosTipos(req: Request, res: Response) {
    TipoController.obtenerTodos(SQL_TIPOS.TODOS, req, res);
  }

  public crearTipo(req: Request, res: Response) {
    const clase = req.body.tipoClase;
    const nombre = req.body.tipoNombre;
    const params = [clase, nombre];
    return TipoController.crearTipo(SQL_TIPOS.CREAR_TIPO, params, res);
  }

  public eliminarTipo(req: Request, res: Response) {
    const id = req.params.tipoId;
    const params = [id];
    TipoController.eliminarTipo(SQL_TIPOS.ELIMINAR, params, res);
  }

  public actualizarTipo(req: Request, res: Response) {
    const id = req.params.tipoId;
    const clase = req.body.tipoClase;
    const nombre = req.body.tipoNombre;
    const params = [id, clase, nombre];
    TipoController.actualizarTipo(SQL_TIPOS.ACTUALIZAR, params, res);
  }
}

const tipoController = new TipoController();
export default tipoController;
