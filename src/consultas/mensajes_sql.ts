export const SQL_MENSAJES = {
  REGISTRAR_SOLICITUD: "INSERT INTO mensaje (mensaje_titulo, mensaje_detalle, \
    mensaje_tipo_id) VALUES ($1,$2,$3,\'No disponible\',2,1) \
    RETURNING usuario_id",
  OBTENER_SOLICITUDES_USUARIO: "SELECT m.mensaje_id, m.mensaje_titulo, m.mensaje_detalle, \
    FROM mensaje m \
    WHERE mensaje_id_solicita = $1 \
    AND mensaje_codpadre IS NULL",
  OBTENER_SOLICITUDES_ADMIN: "SELECT m.mensaje_id, m.mensaje_titulo, m.mensaje_detalle, u.usuario_nombres, u.usuario_apellidos, \
      FROM mensaje m INNER JOIN usuario u ON u.usuario_id = m.mensaje_id_solicita \
      WHERE mensaje_id_solicita = $1 \
      AND mensaje_codpadre IS NULL",
  RESPONDER_MENSAJE: "INSERT INTO mensaje (usuario_nombres, usuario_apellidos, \
    usuario_documento, usuario_telefono,usuario_rol, usuario_estado) VALUES ($1,$2,$3,\'No disponible\',2,1) \
    RETURNING usuario_id",
  OBTENER_HILO_MENSAJES: "WITH RECURSIVE hilo_mensajes AS (\
    SELECT mensaje_id, mensaje_codpadre, mensaje_titulo, mensaje_detalle\
    FROM mensaje\
    WHERE mensaje_id = $1\
    UNION ALL\
      SELECT msj.mensaje_id, msj.mensaje_codpadre, msj.mensaje_titulo, msj.mensaje_detalle\
      FROM mensaje msj\
    	JOIN hilo_mensajes ON msj.mensaje_codpadre = hilo_mensajes.mensaje_id)\
    SELECT * FROM hilo_mensajes;",
}
