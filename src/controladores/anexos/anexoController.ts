import { Request, Response } from 'express';
import AnexoDAO from '../../DAOS/anexoDAO';
import { SQL_ANEXOS } from '../../consultas/anexos_sql';

class AnexoController extends AnexoDAO {

  public subirAnexo(req: Request, res: Response) {
    const id = req.body.mensajeId;
    const anexoNombrePublico = req.file ?.originalname;
    const anexoNombrePrivado = req.file ?.filename;
    const anexoTipo = req.file ?.mimetype;
    const params = [id, anexoNombrePublico, anexoNombrePrivado, anexoTipo];
    AnexoController.subirAnexo(SQL_ANEXOS.REGISTRAR_ANEXO, params, res);
  }

  public obtenerAnexos(req: Request, res: Response) {
    const id = req.params.mensajeId;
    const params = [id];
    AnexoController.obtenerTodos(SQL_ANEXOS.OBTENER_ANEXOS, params, res);
  }
}
const anexoController = new AnexoController();
export default anexoController;
