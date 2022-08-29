import { Request, Response } from 'express';
import UsuarioDAO from '../../DAOS/UsuarioDAO';
import nanoid from 'nanoid';
import { SQL_REGISTRO } from '../../consultas/registro_sql';
import { SQL_USUARIOS } from '../../consultas/usuarios_sql';
import { SQL_IMAGENES } from '../../consultas/imagenes_sql';

class UsuarioController extends UsuarioDAO {

  public obtenerUsuarioUnico(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const params = [id];
    UsuarioController.obtenerUnico(SQL_USUARIOS.OBTENER_USUARIO_UNICO, params, res);
  }

  public obtenerTodosUsuarios(req: Request, res: Response) {
    UsuarioController.obtenerTodos(SQL_USUARIOS.OBTENER_USUARIOS, req, res);
  }

  public registrarUsuarioAcceso(req: Request, res: Response): Promise<any> {
    const nombres = req.body[0].usuarioNombres;
    const apellidos = req.body[0].usuarioApellidos;
    const documento = 'DOC_' + nanoid.nanoid(12);
    const correo = req.body[1].correoUsuario;
    const clave = req.body[1].claveUsuario;
    const params = [nombres, apellidos, documento, correo, clave];
    return UsuarioController.registrarUsuario(
      SQL_REGISTRO.VERIFICAR_CORREO_UNICO,
      SQL_REGISTRO.REGISTRAR_USUARIO,
      SQL_REGISTRO.REGISTRAR_ACCESO,
      SQL_REGISTRO.TODO_LISTO,
      params,
      res);
  }

  public actualizarUsuario(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const nombres = req.body.usuarioNombres;
    const apellidos = req.body.usuarioApellidos;
    const documento = req.body.usuarioDocumento;
    const telefono = req.body.usuarioTelefono;
    const rol = req.body.rolId;
    const params = [id, nombres, apellidos, documento, telefono, rol];
    UsuarioController.actualizarUsuario(SQL_USUARIOS.ACTUALIZAR_USUARIO, params, res);
  }

  public eliminarUsuario(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const params = [id];
    UsuarioController.actualizarUsuario(SQL_USUARIOS.ELIMINAR_USUARIO, params, res);
  }

  public agregarImagen(req: Request, res: Response) {
    if (req.body.base64 != '') {
      const id = req.body.imgUsuarioId;
      const imgNombrePublico = req.body.imgNombrePublico;
      const ext = imgNombrePublico.split('.').pop();
      const imgNombrePrivado = 'IU_' + Date.now() + '.' + ext;
      const imgTipo = req.body.imgTipo;
      const base64 = req.body.base64;
      const params = [id, imgNombrePublico, imgNombrePrivado, imgTipo, base64];
      UsuarioController.actualizarImagen(SQL_IMAGENES.ACTUALIZAR_IMAGEN, SQL_IMAGENES.VERIFICAR_IMAGEN, SQL_IMAGENES.BORRAR_IMAGEN, params, res);
    } else res.status(400).json({ respuesta: 'El base64 esta vacio' });
  }

  public obtenerEstadisticas(req: Request, res: Response) {
    UsuarioController.obtenerEstadisticas(SQL_USUARIOS.STATS_ADMIN, req, res);
  }
  public obtenerEstadisticasUsuario(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const params = [id];
    UsuarioController.obtenerEstadisticasUsuario(SQL_USUARIOS.STATS_USER, params, res);
  }

}
const usuarioController = new UsuarioController();
export default usuarioController;
