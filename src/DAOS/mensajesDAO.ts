import { Response } from 'express';
import pool from '../configuracion/conexion';

class MensajesDAO {

  protected static async obtenerSolicitudes(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({'solicitudes':resultado.rows,'count':resultado.rows.length});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error obteniendo las solicitudes' });
      });
  }

  protected static async obtenerHiloMensajes(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error obteniendo el hilo de mensajes' });
      });
  }

  protected static async registrarSolicitud(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Solicitud registrada", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error registrando solicitud' });
      });
  }

  protected static async responderMensaje(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Mensaje registrado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error registrando mensaje' });
      });
  }

  protected static async eliminarMensaje(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Mensaje eliminado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando mensaje' });
      });
  }

  protected static async modificarEstadoSolicitud(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Solicitud modificada", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error modificando solicitud' });
      });
  }

}
export default MensajesDAO;
