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
  ELIMINAR_USUARIO: 'DELETE FROM acceso WHERE acceso_usuario_id = $1;\
  WITH RECURSIVE hilo_mensajes AS (\
    SELECT m.mensaje_id\
    FROM mensaje m INNER JOIN usuario u ON u.usuario_id = m.mensaje_id_usuario\
	WHERE m.mensaje_id_usuario = $1\
    UNION ALL\
      SELECT msj.mensaje_id\
      FROM mensaje msj\
    	JOIN hilo_mensajes ON msj.mensaje_codpadre = hilo_mensajes.mensaje_id)\
	DELETE FROM mensaje WHERE mensaje_id IN (SELECT mensaje_id FROM hilo_mensajes );\
  DELETE FROM usuario WHERE usuario_id = $1 RETURNING usuario_id;',
  STATS_ADMIN: 'SELECT mensaje_estado,count(mensaje_id) as mensaje_cant\
  FROM mensaje\
  WHERE mensaje_codpadre IS NULL\
  GROUP BY mensaje_estado\
  ORDER BY mensaje_estado;',
  ACTUALIZAR_IMAGEN: 'UPDATE imagenes\
  SET img_nombre_publico = $2, img_nombre_privado= $3, img_tipo= $4\
  WHERE img_usuario_id=$1\
  RETURNING *;',
}
