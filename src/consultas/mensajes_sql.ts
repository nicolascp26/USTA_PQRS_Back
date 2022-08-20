export const SQL_MENSAJES = {
  REGISTRAR_SOLICITUD: "INSERT INTO mensaje (mensaje_codpadre,mensaje_id_usuario,mensaje_estado,mensaje_titulo,mensaje_detalle,mensaje_tipo_id) VALUES \
  (null,$1,1,$2,$3,$4) \
  RETURNING mensaje_id",
  OBTENER_SOLICITUDES_USUARIO: "SELECT m.mensaje_id, m.mensaje_titulo, m.mensaje_detalle,m.mensaje_fecha, m.mensaje_actualizado, \
    m.mensaje_estado,t.tipo_clase,t.tipo_nombre \
    FROM mensaje m INNER JOIN tipo t ON t.tipo_id = m.mensaje_tipo_id\
    WHERE mensaje_id_usuario = $1 \
    AND mensaje_codpadre IS NULL\
    ORDER BY m.mensaje_actualizado DESC",
  OBTENER_SOLICITUDES_ADMIN: "SELECT m.mensaje_id, m.mensaje_titulo, m.mensaje_detalle, m.mensaje_fecha, \
   m.mensaje_estado,m.mensaje_actualizado,u.usuario_nombres, u.usuario_apellidos,t.tipo_id,t.tipo_clase,t.tipo_nombre \
      FROM mensaje m INNER JOIN usuario u ON u.usuario_id = m.mensaje_id_usuario \
      INNER JOIN tipo t ON t.tipo_id = m.mensaje_tipo_id\
      AND mensaje_codpadre IS NULL\
      ORDER BY m.mensaje_actualizado DESC;",
  RESPONDER_MENSAJE: " INSERT INTO mensaje (mensaje_codpadre,mensaje_id_usuario,mensaje_estado,mensaje_actualizado,mensaje_titulo,mensaje_detalle,mensaje_tipo_id) VALUES \
   ($1,$2,null,null,'Re: Respuesta',$4,null);\
   UPDATE mensaje \
   SET mensaje_estado = $3 \
   WHERE mensaje_id = $1;\
   UPDATE mensaje \
   SET mensaje_actualizado = current_timestamp(0) \
   WHERE mensaje_id = $1;",
  OBTENER_HILO_MENSAJES: "WITH RECURSIVE hilo_mensajes AS (\
    SELECT mensaje_id, mensaje_codpadre, mensaje_id_usuario, mensaje_estado, mensaje_titulo, mensaje_detalle, mensaje_fecha\
    FROM mensaje m INNER JOIN usuario u ON u.usuario_id = m.mensaje_id_usuario\
    WHERE mensaje_id = $1\
    UNION ALL\
      SELECT msj.mensaje_id, msj.mensaje_codpadre, msj.mensaje_id_usuario, msj.mensaje_estado, msj.mensaje_titulo, msj.mensaje_detalle, msj.mensaje_fecha\
      FROM mensaje msj\
    	JOIN hilo_mensajes ON msj.mensaje_codpadre = hilo_mensajes.mensaje_id)\
    SELECT hm.mensaje_id, hm.mensaje_estado, hm.mensaje_titulo, hm.mensaje_detalle, hm.mensaje_fecha, u.usuario_nombres,u.usuario_apellidos,hm.mensaje_id_usuario\
  	FROM hilo_mensajes hm INNER JOIN usuario u ON u.usuario_id = hm.mensaje_id_usuario\
    ORDER BY hm.mensaje_fecha ASC;",
  TERMINAR_SOLICITUD: "UPDATE mensaje \
    SET mensaje_estado = 4 \
    WHERE mensaje_id = $1;",
  REABRIR_SOLICITUD: "UPDATE mensaje \
    SET mensaje_estado = 3 \
    WHERE mensaje_id = $1;"
}
