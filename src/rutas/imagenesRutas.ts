import { Router } from 'express';
import usuarioController from '../controladores/usuarios/UsuarioController';
import { verifyToken } from "../middleware/authentication";

class ImagenesRutas {
  public router: Router;
  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.post('/addProfileImage', verifyToken, usuarioController.agregarImagen);
  }
}

const imagenesRutas = new ImagenesRutas();
export default imagenesRutas.router;
