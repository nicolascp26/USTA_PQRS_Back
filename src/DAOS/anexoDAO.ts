import { Response } from 'express';
import pool from '../configuracion/conexion';

class AnexoDAO {

  protected static async subirAnexo(sqlCrear: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      return consulta.one(sqlCrear, parametros);
    }).then((resultado: any) => {
      console.log(resultado.rows);
      res.status(200).json(resultado.rows);
    })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }
}

export default AnexoDAO;
