import { Request, Response } from 'express';
import UsuarioDAO from '../../DAOS/UsuarioDAO';
import nanoid from 'nanoid';
import { SQL_REGISTRO } from '../../consultas/registro_sql';

class UsuarioController extends UsuarioDAO {

  public registrarUsuarioAcceso(req: Request, res: Response): Promise<any> {
    const nombres = req.body[0].usuarioNombres;
    const apellidos = req.body[0].usuarioApellidos;
    const documento = 'DOC_' + nanoid.nanoid(12);
    const correo = req.body[1].correoUsuario;
    const clave = req.body[1].claveUsuario;
    const parametros = [nombres, apellidos, documento, correo, clave];
    console.log(req.body);
    return UsuarioController.registrarUsuario(
      SQL_REGISTRO.VERIFICAR_CORREO_UNICO,
      SQL_REGISTRO.REGISTRAR_USUARIO,
      SQL_REGISTRO.REGISTRAR_ACCESO,
      SQL_REGISTRO.TODO_LISTO,
      parametros,
      res);
  }
}
const usuarioController = new UsuarioController();
export default usuarioController;
