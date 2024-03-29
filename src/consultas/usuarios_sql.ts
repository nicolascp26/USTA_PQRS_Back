export const SQL_USUARIOS = {
  OBTENER_USUARIOS: 'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_id, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id\
  ORDER BY u.usuario_rol',
  OBTENER_DOCENTES: 'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id\
  WHERE u.usuario_rol IN (3)\
  AND u.usuario_id != $1\
  ORDER BY u.usuario_rol',
  OBTENER_USUARIO_UNICO: 'SELECT u.usuario_id, u.usuario_nombres, u.usuario_apellidos, u.usuario_documento, \
  u.usuario_telefono, r.rol_id, r.rol_nombre\
  FROM usuario u INNER JOIN roles r ON u.usuario_rol = r.rol_id\
  WHERE u.usuario_id = $1',
  ACTUALIZAR_USUARIO: 'UPDATE usuario\
  SET usuario_nombres = $2, usuario_apellidos= $3, usuario_documento= $4, usuario_telefono = $5, usuario_rol = $6\
  WHERE usuario_id=$1\
  RETURNING *;',
  ELIMINAR_USUARIO: 'DELETE FROM imagenes WHERE img_usuario_id=$1;\
  DELETE FROM acceso WHERE acceso_usuario_id = $1;\
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
  STATS_ADMIN: 'SELECT DISTINCT \
(SELECT count(usuario_id) FROM usuario) as activos,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=1) as nuevas,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=2) as respondidas,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=3) as esperando,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=4) as terminadas,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL) as totales \
FROM mensaje',
  STATS_USER: 'SELECT DISTINCT \
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=1 AND mensaje_id_usuario = $1) as nuevas,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=2 AND mensaje_id_usuario = $1) as esperando,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=3 AND mensaje_id_usuario = $1) as respondidas,\
(SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=4 AND mensaje_id_usuario = $1) as terminadas,\
(SELECT count(mensaje_id_usuario) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_id_usuario = $1) as totales \
FROM mensaje',
  STATS_DOCENTE: 'SELECT DISTINCT \
  (SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=1 AND mensaje_usuario_asignado = $1) as nuevas,\
  (SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=2 AND mensaje_usuario_asignado = $1) as respondidas,\
  (SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=3 AND mensaje_usuario_asignado = $1) as esperando,\
  (SELECT count(mensaje_id) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_estado=4 AND mensaje_usuario_asignado = $1) as terminadas,\
(SELECT count(mensaje_usuario_asignado) FROM mensaje WHERE mensaje_codpadre IS NULL AND mensaje_usuario_asignado = $1) as totales \
FROM mensaje',
}
