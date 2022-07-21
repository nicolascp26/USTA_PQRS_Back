export const SQL_ACCESO = {
  INICIAR: "SELECT u.usuario_id, ro.rol_id, ro.rol_nombre, u.usuario_nombres, \
  (SELECT img_nombreprivado FROM imagenes i WHERE i.img_usuario_id = u.usuario_id)\
  FROM usuario u INNER JOIN roles ro ON u.usuario_rol = ro.rol_id \
  INNER JOIN acceso acc ON u.usuario_id = acc.acceso_usuario_id \
  WHERE acc.acceso_correo=$1 AND acc.acceso_clave=$2"
};
