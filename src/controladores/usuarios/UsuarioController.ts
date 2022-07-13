import { Request, Response } from 'express';
import UsuarioDAO from '../../DAOS/UsuarioDAO';
import nanoid from 'nanoid';
import { SQL_REGISTRO } from '../../consultas/registro_sql';
import { SQL_USUARIOS } from '../../consultas/usuarios_sql';

class UsuarioController extends UsuarioDAO {

public obtenerUsuarioUnico(req:Request,res:Response){
  const id = req.params.usuarioId;
  const params = [id];
  UsuarioController.obtenerUnico(SQL_USUARIOS.OBTENER_USUARIO_UNICO,params,res);
}

public obtenerTodosUsuarios(req:Request,res:Response){
  UsuarioController.obtenerTodos(SQL_USUARIOS.OBTENER_USUARIOS,req,res);
}

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

  public actualizarUsuario(req:Request, res:Response){
    const id = req.params.usuarioId;
    const nombres = req.body.usuarioNombres;
    const apellidos = req.body.usuarioApellidos;
    const documento = req.body.usuarioDocumento;
    const telefono = req.body.usuarioTelefono;
    const rol = req.body.usuarioRol.rolId;
    const params = [id, nombres, apellidos, documento, telefono, rol];
    UsuarioController.actualizarUsuario(SQL_USUARIOS.ACTUALIZAR_USUARIO,params,res);
  }

}
const usuarioController = new UsuarioController();
export default usuarioController;
