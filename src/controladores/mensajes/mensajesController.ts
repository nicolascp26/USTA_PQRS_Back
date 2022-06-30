import { Request, Response } from 'express';
import MensajesDAO from '../../DAOS/mensajesDAO';
import { SQL_MENSAJES } from '../../consultas/mensajes_sql';

class MensajesController extends MensajesDAO {

  public obtenerSolicitudes(req: Request, res: Response) {
    MensajesController.obtenerSolicitudes(SQL_MENSAJES.OBTENER_SOLICITUDES, req, res);
  }

  public obtenerHiloMensajes(req: Request, res: Response) {
    MensajesController.obtenerHiloMensajes(SQL_MENSAJES.OBTENER_HILO_MENSAJES, req, res);
  }

  public registrarSolicitud(req: Request, res: Response){
    const params = [req.body.rolNombre];
    return MensajesController.registrarSolicitud(SQL_MENSAJES.REGISTRAR_SOLICITUD,params,res);
  }

  public agregarMensaje(req: Request, res: Response){
    const params = [req.body.rolNombre];
    return MensajesController.agregarMensaje(SQL_MENSAJES.AGREGAR_MENSAJE,params,res);
  }

}

const mensajesController = new MensajesController();
export default mensajesController;
