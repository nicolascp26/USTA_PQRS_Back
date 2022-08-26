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
  protected static async obtenerTodos(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        for (const index in resultado.rows) {
          resultado.rows[index].anexoNombrePrivado = 'http://localhost:8097/' + resultado.rows[index].anexoNombrePrivado;
        }
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta rol' });
      });
  }
}

export default AnexoDAO;
