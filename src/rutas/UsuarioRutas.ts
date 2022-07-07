import { Router } from 'express';
import usuarioController from '../controladores/usuarios/UsuarioController';

class UsuarioRutas {
  public router: Router;
  constructor() {
    this.router= Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.post('/registro', usuarioController.registrarUsuarioAcceso);
    this.router.get('/getAll', usuarioController.obtenerTodosUsuarios);
    this.router.get('/getSingle/:usuarioId', usuarioController.obtenerUsuarioUnico);
    this.router.put('/update/:usuarioId',usuarioController.actualizarUsuario);
  }
}

const usuarioRutas = new UsuarioRutas();
export default usuarioRutas.router;
