import { Request, Response } from 'express';
import MensajesDAO from '../../DAOS/mensajesDAO';
import { SQL_MENSAJES } from '../../consultas/mensajes_sql';

class MensajesController extends MensajesDAO {

  public obtenerSolicitudesAdmin(req: Request, res: Response) {
    MensajesController.obtenerSolicitudes(SQL_MENSAJES.OBTENER_SOLICITUDES_ADMIN, req, res);
  }

  public obtenerSolicitudesUsuario(req: Request, res: Response) {
    const id = req.params.usuarioId;
    const params = [id];
    MensajesController.obtenerSolicitudes(SQL_MENSAJES.OBTENER_SOLICITUDES_USUARIO, params, res);
  }

  public obtenerSolicitudesDocente(req: Request, res: Response) {
    const id = req.params.usuarioAsignado;
    const params = [id];
    MensajesController.obtenerSolicitudes(SQL_MENSAJES.OBTENER_SOLICITUDES_DOCENTE, params, res);
  }

  public obtenerHiloMensajes(req: Request, res: Response) {
    const id = req.params.mensajeId;
    const params = [id];
    MensajesController.obtenerHiloMensajes(SQL_MENSAJES.OBTENER_HILO_MENSAJES, params, res);
  }

  public registrarSolicitud(req: Request, res: Response) {
    const usuarioId = req.body.mensajeUsuario;
    const titulo = req.body.mensajeTitulo;
    const detalle = req.body.mensajeDetalle;
    const tipo = req.body.tipoId;
    const params = [usuarioId, titulo, detalle, tipo];
    return MensajesController.registrarSolicitud(SQL_MENSAJES.REGISTRAR_SOLICITUD, params, res);
  }

  public responderMensaje(req: Request, res: Response) {
    let titulo = req.body.mensajeTitulo;
    if (titulo == '') { titulo = 'Re: Respuesta' };
    const id = req.params.mensajeId;
    const usuario = req.body.mensajeUsuario;
    const estado = req.body.mensajeEstado;
    const detalle = req.body.mensajeDetalle;
    const params = [id, usuario, estado, titulo, detalle];
    return MensajesController.responderMensaje(SQL_MENSAJES.RESPONDER_MENSAJE, params, res);
  }

  public terminarSolicitud(req: Request, res: Response) {
    const id = req.params.mensajeId;
    const params = [id];
    return MensajesController.modificarEstadoSolicitud(SQL_MENSAJES.TERMINAR_SOLICITUD, params, res);
  }

  public reabrirSolicitud(req: Request, res: Response) {
    const id = req.params.mensajeId;
    const params = [id];
    return MensajesController.modificarEstadoSolicitud(SQL_MENSAJES.REABRIR_SOLICITUD, params, res);
  }

  public reasignarSolicitud(req: Request, res: Response) {
    const mensajeId = req.body[0];
    const usuarioId = req.body[1];
    const params = [mensajeId,usuarioId];
    return MensajesController.modificarEstadoSolicitud(SQL_MENSAJES.REASIGNAR_SOLICITUD, params, res);
  }

}

const mensajesController = new MensajesController();
export default mensajesController;
