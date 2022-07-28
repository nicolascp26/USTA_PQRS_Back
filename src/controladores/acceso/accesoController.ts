import { Request, Response } from 'express';
import AccesoDAO from '../../DAOS/accesoDAO';
import { SQL_ACCESO } from '../../consultas/acceso_sql';
import { SQL_REGISTRO } from '../../consultas/registro_sql';

class AccesoController extends AccesoDAO {

  public iniciar(req: Request, res: Response): Promise<any> {
    const correo = req.body.correoUsuario;
    const clave = req.body.claveUsuario;
    const parametros = [correo, clave];
    return AccesoController.iniciarSesion(SQL_ACCESO.INICIAR, parametros, res);
  }

  public actualizarAcceso(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const correo = req.body.correoUsuario;
    const clave = req.body.claveUsuario;
    const params = [id, correo,clave];
    AccesoController.actualizarAcceso(SQL_ACCESO.ACTUALIZAR_ACCESO,SQL_REGISTRO.VERIFICAR_CORREO_UNICO, params, res);
  }

}
const accesoController = new AccesoController();
export default accesoController;
