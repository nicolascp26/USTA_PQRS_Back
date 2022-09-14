import { Router } from 'express';
import usuarioController from '../controladores/usuarios/UsuarioController';
import { verifyToken, isAdmin } from "../middleware/authentication";

class UsuarioRutas {
  public router: Router;
  constructor() {
    this.router = Router();
    this.todasLasRutas();
  }
  public todasLasRutas(): void {
    this.router.post('/registro', usuarioController.registrarUsuarioAcceso);
    this.router.get('/getAll', verifyToken, usuarioController.obtenerTodosUsuarios);
    this.router.get('/getSingle/:usuarioId', verifyToken, usuarioController.obtenerUsuarioUnico);
    this.router.get('/getTeachers/:usuarioId', [verifyToken, isAdmin], usuarioController.obtenerDocentes);
    this.router.put('/update/:usuarioId', verifyToken, usuarioController.actualizarUsuario);
    this.router.delete('/delete/:usuarioId', [verifyToken, isAdmin], usuarioController.eliminarUsuario);
    this.router.get('/getStats', verifyToken, usuarioController.obtenerEstadisticas);
    this.router.get('/getStats/:usuarioId', verifyToken, usuarioController.obtenerEstadisticasUsuario);
    this.router.get('/getStatsTeacher/:usuarioId', verifyToken, usuarioController.obtenerEstadisticasDocente);
  }
}

const usuarioRutas = new UsuarioRutas();
export default usuarioRutas.router;
