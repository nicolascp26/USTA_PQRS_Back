import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import rolRutas from './rutas/rolRutas';
import accesoRutas from './rutas/accesoRutas';
import mensajesRutas from './rutas/mensajesRutas';
import usuarioRutas from './rutas/UsuarioRutas';
import tipoRutas from './rutas/tipoRutas';
import preguntaRutas from './rutas/preguntaRutas';
import imagenesRutas from './rutas/imagenesRutas';
import anexosRutas from './rutas/anexosRutas';

class Servidor {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.configuracion();
    this.ruteo();
  }

  public configuracion(): void {
    this.app.set('PORT', 8097);
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.static('src/public/anexos'));
    this.app.use(express.json({ limit: '20mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public ruteo(): void {
    //Rutas publicas
    this.app.use('/miapi/publico/usuario', usuarioRutas);
    this.app.use('/miapi/publico/acceso', accesoRutas);
    //Rutas privadas
    this.app.use('/miapi/privado/mensajes', mensajesRutas);
    this.app.use('/miapi/privado/role', rolRutas);
    this.app.use('/miapi/privado/tipo', tipoRutas);
    this.app.use('/miapi/privado/preguntas', preguntaRutas);
    this.app.use('/miapi/privado/imagenes', imagenesRutas);
    this.app.use('/miapi/privado/anexos', anexosRutas);
  }

  public iniciar(): void {
    this.app.listen(this.app.get('PORT'), () => {
      console.log('Back Funcionando...', this.app.get('PORT'));
    });
  }
}

const miServidor = new Servidor();
console.clear();
miServidor.iniciar();
