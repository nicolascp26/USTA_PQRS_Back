import { Response } from 'express';
import pool from '../configuracion/conexion';

class RolDAO {

  protected static async obtenerTodos(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta rol' });
      });
  }
}

export default RolDAO;
