export const SQL_USUARIOS = {
  OBTENER_USUARIOS:'SELECT usuario_id, usuario_nombres, usuario_apellidos \
  FROM usuarios',
  ACTUALIZAR_USUARIO:'UPDATE usuarios \
  SET usuario_rol = $1\
  WHERE usuario_id=$2',
  ELIMINAR_USUARIO:'DELETE FROM usuarios WHERE usuarios_id = $1'
}
