export const SQL_REGISTRO = {
  REGISTRAR_USUARIO: "INSERT INTO usuario (usuario_nombres, usuario_apellidos, \
    usuario_documento, usuario_telefono,usuario_rol, usuario_estado) VALUES ($1,$2,$3,\'No disponible\',2,1) \
    RETURNING usuario_id",

  REGISTRAR_ACCESO: "INSERT INTO acceso ( acceso_correo, acceso_clave,acceso_usuario_id) \
   VALUES ($1,$2,$3)",

   VERIFICAR_CORREO_UNICO:"SELECT COUNT(acc.acceso_correo) FROM acceso acc \
   WHERE acc.acceso_correo=$1",

   TODO_LISTO: 'SELECT u.usuario_id, u.usuario_rol, u.usuario_estado, r.rol_nombre, a.acceso_correo \
  FROM usuarios u INNER JOIN roles r ON u.usuario_rol = r.rol_id \
  INNER JOIN accesos a ON u.usuario_id = a.acceso_usuario_id \
  WHERE u.usuario_id = $1'

};
