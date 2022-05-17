import { Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

class AccesoControllerVerificar {

  public static async procesarRespuesta(registro: any, correo: string, res: Response): Promise<any> {
    let base = '';
    const rutaImagenSistema = './src/imagenes/sistema/fondo_usuario_login.png';
    const rutaImagenPrivada = './src/imagenes/fotos/' + registro.img_nombreprivado;
    const token = jwt.sign({
       'id': registro.usuario_id,
       'correo': correo,
     'rol_nombre':registro.rol_nombre,
   'usuario_nombre':registro.usuario_nombres},

    'clavesupersecretagg');

    if (fs.existsSync(rutaImagenPrivada)) {
      base = fs.readFileSync(rutaImagenPrivada, 'base64');
    } else {
      base = fs.readFileSync(rutaImagenSistema, 'base64');
    }
    res.status(200).json({ 'token': token, 'foto': base});
  }
}

export default AccesoControllerVerificar;
