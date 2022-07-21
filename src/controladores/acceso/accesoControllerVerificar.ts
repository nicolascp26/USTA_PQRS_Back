import { Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

class AccesoControllerVerificar {

  public static async procesarRespuesta(registro: any, correo: string, res: Response): Promise<any> {
    let base = '';
    const rutaImagenSistema = './src/imagenes/sistema/fondo_usuario_login.png';
    const rutaImagenPrivada = './src/imagenes/fotos/' + registro.imgNombreprivado;
    const token = jwt.sign({
      'id': registro.usuarioId,
      'correo': correo,
      'usuarioRol': registro.rolNombre,
      'usuarioNombres': registro.usuarioNombres
    },
      'clavesupersecretagg');

    if (fs.existsSync(rutaImagenPrivada)) {
      base = fs.readFileSync(rutaImagenPrivada, 'base64');
    } else {
      base = fs.readFileSync(rutaImagenSistema, 'base64');
    }

    res.status(200).json({ 'token': token, 'foto': base, 'rol': registro.rolNombre });
  }
}

export default AccesoControllerVerificar;
