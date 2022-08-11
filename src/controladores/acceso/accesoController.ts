import { Request, Response } from 'express';
import AccesoDAO from '../../DAOS/accesoDAO';
import { SQL_ACCESO } from '../../consultas/acceso_sql';

class AccesoController extends AccesoDAO {

  public iniciar(req: Request, res: Response): Promise<any> {
    const correo = req.body.correoUsuario;
    const clave = req.body.claveUsuario;
    const parametros = [correo, clave];
    return AccesoController.iniciarSesion(SQL_ACCESO.INICIAR, parametros, res);
  }

  public actualizarClave(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const claveActual = req.body[0].claveUsuario;
    const claveNueva = req.body[1];
    const params = [id, claveActual, claveNueva];
    AccesoController.actualizarClave(SQL_ACCESO.VERIFICAR_CLAVE, SQL_ACCESO.ACTUALIZAR_CLAVE, params, res);
  }

}
const accesoController = new AccesoController();
export default accesoController;
