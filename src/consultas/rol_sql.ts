export const SQL_ROL = {
  OBTENER_ROL: 'select rol_id, rol_nombre \
  FROM roles WHERE rol_id = $1',

  TODOS: 'select r.rol_id, r.rol_nombre, \
  (select count(u.usuario_id) from usuario u where u.usuario_rol = r.rol_id) as cant_usuarios \
  from roles r \
  order by r.rol_id',
}
