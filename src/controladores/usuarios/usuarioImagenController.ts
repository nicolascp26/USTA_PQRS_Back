import { Response } from 'express';
import fs from 'fs';

class UsuarioImagenController {

  public static async procesarImagen(registroBase: string, registroNombre: string, res: Response): Promise<any> {
    let base = registroBase;
    let imgNombre = registroNombre;
    const rutaImagenPrivada = './src/public/fotos/' + imgNombre;
    if (!fs.existsSync(rutaImagenPrivada)) {
      fs.writeFileSync(rutaImagenPrivada, base, 'base64');
    } else {
      return;
    }
    res.status(200).json({ 'respuesta': 'Imagen guardada con exito' });
  }

  public static eliminarImagen(imgNombre: string): void {
    const rutaImagenPrivada = './src/public/fotos/' + imgNombre;
    console.log(rutaImagenPrivada);
    if (fs.existsSync(rutaImagenPrivada)) {
      fs.unlinkSync(rutaImagenPrivada);
    } else {
      return;
    }
  }
}

export default UsuarioImagenController;
