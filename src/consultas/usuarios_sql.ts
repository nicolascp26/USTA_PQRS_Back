export const SQL_USUARIOS = {
  OBTENER_USUARIOS:'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_id, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id',
  OBTENER_USUARIO_UNICO:'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_id, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id\
  WHERE u.usuario_id = $1',
  ACTUALIZAR_USUARIO:'UPDATE usuarios \
  SET usuario_rol = $1\
  WHERE usuario_id=$2',
  ELIMINAR_USUARIO:'DELETE FROM usuarios WHERE usuarios_id = $1'
}
