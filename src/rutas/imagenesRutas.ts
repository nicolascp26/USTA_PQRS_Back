import { Router } from 'express';
import usuarioController from '../controladores/usuarios/UsuarioController';

class ImagenesRutas {
  public router: Router;
  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.post('/addProfileImage', usuarioController.agregarImagen);
  }
}

const imagenesRutas = new ImagenesRutas();
export default imagenesRutas.router;
