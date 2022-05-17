import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import rolRutas from './rutas/rolRutas';
import accesoRutas from './rutas/accesoRutas';
import usuarioRutas from './rutas/UsuarioRutas';

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
    this.app.use(express.json({ limit: '20mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public ruteo(): void {
    this.app.use('/miapi/publico/usuario', usuarioRutas);
    this.app.use('/miapi/publico/acceso', accesoRutas);
  }

  public iniciar(): void {
    this.app.listen(this.app.get('PORT'), () => {
      console.log('De por dios, el back es muy facil', this.app.get('PORT'));
    });
  }

}
const miServidor = new Servidor();

miServidor.iniciar();
