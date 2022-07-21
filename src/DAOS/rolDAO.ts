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

  protected static async crearRol(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Rol creado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando rol' });
      });
  }

  protected static async eliminarRol(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Rol eliminado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando rol' });
      });
  }

  protected static async actualizarRol(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Rol actualizado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error actualizando rol' });
      });
  }
}

export default RolDAO;
