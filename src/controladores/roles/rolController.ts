import { Response, Request } from 'express';
import GestorBD from '../../configuracion/gestorbd';

class RolController extends GestorBD {

  public obtenerRoles(req: Request, res: Response): Promise<any> {
    const sql = 'SELECT rol_id,rol_nombre FROM roles ORDER BY ';
    return RolController.ejecutarConsulta(sql,req,res,'select');
  }

}

const miRolControlador = new RolController();
export default miRolControlador;
