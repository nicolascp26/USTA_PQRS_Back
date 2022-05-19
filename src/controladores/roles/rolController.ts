import { Request, Response } from 'express';
import RolDAO from '../../DAOS/rolDAO';
import { SQL_ROL } from '../../consultas/rol_sql';

class RolController extends RolDAO {

  public obtenerTodosRoles(req: Request, res: Response) {
    RolController.obtenerTodos(SQL_ROL.TODOS, req, res);
  }

  public crearRol(req: Request, res: Response){
    const rol_nombre = req.body.rol_nombre;
    const params = [rol_nombre];
    return RolController.crearRol(SQL_ROL.CREAR_ROL,params,res);
  }

  public eliminarUnRol(req: Request, res: Response) {
    const id = req.params.rolID;
    const params = [id];
    RolController.eliminarRol(SQL_ROL.ELIMINAR, params, res);
  }

}

const rolController = new RolController();
export default rolController;
