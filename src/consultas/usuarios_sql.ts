export const SQL_USUARIOS = {
  OBTENER_USUARIOS: 'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_id, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id',
  OBTENER_USUARIO_UNICO: 'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_id, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id\
  WHERE u.usuario_id = $1',
  ACTUALIZAR_USUARIO: 'UPDATE usuario\
  SET usuario_nombres = $2, usuario_apellidos= $3, usuario_documento= $4, usuario_telefono = $5, usuario_rol = $6\
  WHERE usuario_id=$1\
  RETURNING *;',
  ELIMINAR_USUARIO: 'DELETE FROM usuarios WHERE usuarios_id = $1'
}
