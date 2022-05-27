import { Response } from 'express';
import pool from '../configuracion/conexion';
import AccesoControllerVerificar from '../controladores/acceso/accesoControllerVerificar';
import { SQL_ACCESO } from '../consultas/acceso_sql';

class UsuarioDAO {

//Metodo para listar usuarios
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

  //Metodo para crear usuarios
  protected static async registrarUsuario(sqlVerificarCorreo:string,sqlCrearUsuario: string, sqlCrearAcceso: string, sqlTodoListo:string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      const correoVerificar = parametros[3];
      const correo = await consulta.one(sqlVerificarCorreo, correoVerificar);
      if(correo.existe == 0){
        const codUsuario = await consulta.one(sqlCrearUsuario, parametros);
        let acceso = [];
        acceso.push(parametros[3]);
        acceso.push(parametros[4]);
        acceso.push(codUsuario.usuario_id);
        await consulta.none(sqlCrearAcceso, acceso);
      return await consulta.result(SQL_ACCESO.INICIAR, acceso);
    }else{
      return await consulta.result(sqlTodoListo, [-1]);
    }
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

export default UsuarioDAO;
