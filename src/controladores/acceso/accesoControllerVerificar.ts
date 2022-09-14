import { Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

class AccesoControllerVerificar {

  public static async procesarRespuesta(registro: any, correo: string, res: Response): Promise<any> {
    let base = '';
    let expireTime = '';
    let rolTemp = registro.rolNombre;
    switch (rolTemp) {
      case 'Administrador':
        expireTime = '24h';
        break;
      case 'Estudiante':
        expireTime = '2h';
        break;
      case 'Docente':
        expireTime = '20h';
        break;
      case 'Invitado':
        expireTime = '1h';
        break;
    }
    const rutaImagenSistema = './src/public/sistema/fondo_usuario_login.png';
    const rutaImagenPrivada = './src/public/fotos/' + registro.imgNombrePrivado;
    const token = jwt.sign({
      'id': registro.usuarioId,
      'correo': correo,
      'rolId':registro.rolId,
      'usuarioRol': registro.rolNombre,
      'usuarioNombres': registro.usuarioNombres
    },
      'clavesupersecretagg', {
        expiresIn: expireTime
      });

    if (fs.existsSync(rutaImagenPrivada)) {
      base = fs.readFileSync(rutaImagenPrivada, 'base64');
    } else {
      base = fs.readFileSync(rutaImagenSistema, 'base64');
    }

    res.status(200).json({ 'token': token, 'foto': base, 'rol': registro.rolNombre });
  }
}

export default AccesoControllerVerificar;
