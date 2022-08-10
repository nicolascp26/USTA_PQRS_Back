import { Response } from 'express';
import pool from '../configuracion/conexion';
import { SQL_ACCESO } from '../consultas/acceso_sql';
import UsuarioImagenController from '../controladores/usuarios/usuarioImagenController';

class UsuarioDAO {

  //Metodo para listar usuarios
  protected static async obtenerTodos(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }

  //Metodo para traer un usuario unico por su id
  protected static async obtenerUnico(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }

  //Metodo para crear usuarios
  protected static async registrarUsuario(sqlVerificarCorreo: string, sqlCrearUsuario: string, sqlCrearAcceso: string, sqlTodoListo: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      const correoVerificar = parametros[3];
      const correo = await consulta.one(sqlVerificarCorreo, correoVerificar);
      if (correo.count == 0) {
        const codUsuario = await consulta.one(sqlCrearUsuario, parametros);
        let acceso = [];
        acceso.push(parametros[3]);
        acceso.push(parametros[4]);
        acceso.push(codUsuario.usuarioId);
        await consulta.none(sqlCrearAcceso, acceso);
        return await consulta.result(SQL_ACCESO.INICIAR, acceso);
      } else {
        return await consulta.result(sqlTodoListo, [-1]);
      }
    }).then(resultado => {
      const arreglo = resultado.rows;
      if (arreglo.length == 0) {
        res.status(400).json({ 'respuesta': 'usuario ya existe' });
      } else {
        res.status(200).json(resultado.rows[0]);
      }
    }).catch(
      miError => {
        console.log(miError);
        res.status(400).json({ 'respuesta': 'usuario no valido' });
      }
    );
  }

  protected static async actualizarUsuario(sqlActualizarUsuario: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      return await consulta.one(sqlActualizarUsuario, parametros);
    }).then((resultado: any) => {
      res.status(200).json(resultado.rows);
    })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }

  protected static async eliminarUsuario(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({ respuesta: "Usuario eliminado", resultado: resultado.rowCount });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando usuario' });
      });
  }

  protected static async actualizarImagen(sqlCrear: string, sqlVerificar: string, sqlEliminar: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      const imgExiste = await consulta.one(sqlVerificar, parametros[0]);
      if (imgExiste.count != 0) {
        const imgPriv = await consulta.one(sqlEliminar, parametros[0]);
        UsuarioImagenController.eliminarImagen(imgPriv.imgNombrePrivado);
        UsuarioImagenController.procesarImagen(parametros[4], parametros[2], res);
        return await consulta.one(sqlCrear, parametros);
      } else {
        UsuarioImagenController.procesarImagen(parametros[4], parametros[2], res);
        return await consulta.one(sqlCrear, parametros);
      }
    }).then((resultado: any) => {
      res.status(200).json(resultado.rows);
    })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }

  protected static async obtenerEstadisticas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }

  protected static async obtenerEstadisticasUsuario(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      return await consulta.result(sql,parametros);
    }).then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta' });
      });
  }
}

export default UsuarioDAO;
