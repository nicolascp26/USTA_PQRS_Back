export const SQL_MENSAJES = {
  REGISTRAR_SOLICITUD: "INSERT INTO mensaje (mensaje_codpadre,mensaje_id_solicita, mensaje_id_responde,mensaje_estado,mensaje_prioridad,mensaje_titulo,mensaje_detalle,mensaje_tipo_id) VALUES \
  (null,$1,$2,1,1,$3,$4,$5) \
  RETURNING mensaje_id",
  OBTENER_SOLICITUDES_USUARIO: "SELECT m.mensaje_id, m.mensaje_titulo, m.mensaje_detalle, \
    FROM mensaje m \
    WHERE mensaje_id_solicita = $1 \
    AND mensaje_codpadre IS NULL",
  OBTENER_SOLICITUDES_ADMIN: "SELECT m.mensaje_id, m.mensaje_titulo, m.mensaje_detalle, \
  to_char(m.mensaje_fecha,'DD-MM-YYYY') as mensaje_fecha,to_char(m.mensaje_hora,'HH24:MI') as mensaje_hora,\
  m.mensaje_estado,m.mensaje_prioridad, m.mensaje_tipo_id,u.usuario_nombres, u.usuario_apellidos \
      FROM mensaje m INNER JOIN usuario u ON u.usuario_id = m.mensaje_id_solicita \
      AND mensaje_codpadre IS NULL",
  RESPONDER_MENSAJE: " INSERT INTO mensaje (mensaje_codpadre,mensaje_id_solicita, mensaje_id_responde,mensaje_estado,mensaje_prioridad,mensaje_titulo,mensaje_detalle,mensaje_tipo_id) VALUES \
   ($1,null,null,null,null,'Re: Respuesta',$2,null);\
   UPDATE mensaje \
   SET mensaje_estado = 2 \
   WHERE mensaje_id = $1;",
  OBTENER_HILO_MENSAJES: "WITH RECURSIVE hilo_mensajes AS (\
    SELECT mensaje_id, mensaje_codpadre, mensaje_titulo, mensaje_detalle, mensaje_fecha\
    FROM mensaje\
    WHERE mensaje_id = $1\
    UNION ALL\
      SELECT msj.mensaje_id, msj.mensaje_codpadre, msj.mensaje_titulo, msj.mensaje_detalle, msj.mensaje_fecha\
      FROM mensaje msj\
    	JOIN hilo_mensajes ON msj.mensaje_codpadre = hilo_mensajes.mensaje_id)\
    SELECT * FROM hilo_mensajes;",
}
