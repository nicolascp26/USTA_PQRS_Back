import { Request, Response } from 'express';
import RolDAO from '../../DAOS/rolDAO';
import { SQL_ROL } from '../../consultas/rol_sql';

class RolController extends RolDAO {

  public obtenerTodosRoles(req: Request, res: Response) {
    RolController.obtenerTodos(SQL_ROL.TODOS, req, res);
  }
}

const rolController = new RolController();
export default rolController;
