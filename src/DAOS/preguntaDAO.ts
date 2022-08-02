import { Response } from 'express';
import pool from '../configuracion/conexion';

class PreguntaDAO {

  protected static async obtenerTodas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }

  protected static async crearPregunta(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Pregunta frecuente creado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando pregunta frecuente' });
      });
  }

  protected static async eliminarPregunta(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Pregunta frecuente eliminado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando pregunta frecuente' });
      });
  }

  protected static async actualizarPregunta(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Pregunta frecuente actualizada", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error actualizando pregunta frecuente' });
      });
  }
}

export default PreguntaDAO;
