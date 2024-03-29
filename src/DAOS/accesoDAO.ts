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
      console.log(arreglo);
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

  protected static async actualizarClave(sqlVerificarClave: string, sqlActualizarClave: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      const claveActual = parametros[1];
      let verificacion = await consulta.result(sqlVerificarClave, parametros[0]);
      verificacion = verificacion.rows[0].accesoClave;
      if (claveActual == verificacion) {
        return await consulta.result(sqlActualizarClave, parametros);
      }
    }).then((resultado: any) => {
      res.status(200).json(resultado.rows);
    })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }
}

export default AccesoDAO;
