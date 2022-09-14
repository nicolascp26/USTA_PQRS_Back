import { Router } from 'express';
import mensajesController from '../controladores/mensajes/mensajesController';
import { verifyToken, isAdmin, isStudent } from "../middleware/authentication";

class MensajesRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.router.get('/getAllAdmin', verifyToken, mensajesController.obtenerSolicitudesAdmin);
    this.router.get('/getAllUser/:usuarioId', verifyToken, mensajesController.obtenerSolicitudesUsuario);
    this.router.get('/getAllTeacher/:usuarioAsignado', verifyToken, mensajesController.obtenerSolicitudesDocente);
    this.router.get('/getMsgThread/:mensajeId', verifyToken, mensajesController.obtenerHiloMensajes);
    this.router.post('/sendRequest', [verifyToken, isStudent], mensajesController.registrarSolicitud);
    this.router.post('/replyMessage/:mensajeId', verifyToken, mensajesController.responderMensaje);
    this.router.put('/finalizeRequest/:mensajeId', verifyToken, mensajesController.terminarSolicitud);
    this.router.put('/reopenRequest/:mensajeId', [verifyToken, isAdmin], mensajesController.reabrirSolicitud);
    this.router.put('/reassignRequest', [verifyToken, isAdmin], mensajesController.reasignarSolicitud);
  }
}
const mensajesRutas = new MensajesRutas();
export default mensajesRutas.router;
