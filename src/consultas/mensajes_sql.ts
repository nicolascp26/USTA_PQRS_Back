export const SQL_MENSAJES={
  REGISTRAR_SOLICITUD: "INSERT INTO mensaje (usuario_nombres, usuario_apellidos, \
    usuario_documento, usuario_telefono,usuario_rol, usuario_estado) VALUES ($1,$2,$3,\'No disponible\',2,1) \
    RETURNING usuario_id",
  OBTENER_SOLICITUDES: "select rol_id, rol_nombre \
    FROM mensajes WHERE mensaje_id_solicita = $1 \
    AND mensaje_codpadre IS NULL",
  AGREGAR_MENSAJE: "INSERT INTO mensajes (usuario_nombres, usuario_apellidos, \
    usuario_documento, usuario_telefono,usuario_rol, usuario_estado) VALUES ($1,$2,$3,\'No disponible\',2,1) \
    RETURNING usuario_id",
  OBTENER_HILO_MENSAJES: "select rol_id, rol_nombre \
  FROM roles WHERE rol_id = $1",
}
