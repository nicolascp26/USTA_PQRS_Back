import { Response } from 'express';
import pool from '../configuracion/conexion';
import AccesoControllerVerificar from '../controladores/acceso/accesoControllerVerificar';

//Acceso DAO for data query
class AccesoDAO {
  protected static async iniciarSesion(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      const fila = await consulta.result(sql, parametros);
      return fila;
    }).then(resultado => {
      const arreglo = resultado.rows;
      if (arreglo.length == 0) {
        res.status(400).json({ 'respuesta': 'usuario no valido' });
      } else {
        AccesoControllerVerificar.procesarRespuesta(arreglo[0], parametros[0], res);
      }

    }).catch(
      miError => {
        console.log(miError);
        res.status(400).json({ 'respuesta': 'usuario no valido' });
      }
    );
  }
}

export default AccesoDAO;
