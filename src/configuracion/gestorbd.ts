import { Response } from 'express';
import pool from './conexion';

class GestorBD {

  protected static async ejecutarConsulta
    (sql: string, parametros: any, respuesta: Response, tipo: string): Promise<any> {
    pool.result(sql, parametros).then(resultado => {

      switch (tipo) {
        case 'select':
        respuesta.status(200).json(resultado.rows);
          break;
      }

    }).catch(miError => {
      console.log(miError);
      respuesta.status(404).json({
        'mensaje': 'Error al ejecutar la consulta'
      });
    });
  }
}

export default GestorBD;
