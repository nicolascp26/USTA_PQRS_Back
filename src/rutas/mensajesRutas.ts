import { Router } from 'express';
import mensajesController from '../controladores/mensajes/mensajesController';

class MensajesRutas {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.router.get('/getAllAdmin',mensajesController.obtenerSolicitudesAdmin);
    this.router.get('/getAllUser',mensajesController.obtenerSolicitudesUsuario);
    this.router.get('/getMsgThread/:mensajeId',mensajesController.obtenerHiloMensajes);
    this.router.post('/sendRequest', mensajesController.registrarSolicitud);
    this.router.post('/replyMessage/:mensajeId', mensajesController.responderMensaje);
  }
}
const mensajesRutas = new MensajesRutas();
export default mensajesRutas.router;
