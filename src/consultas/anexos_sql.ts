export const SQL_ANEXOS = {
  REGISTRAR_ANEXO: 'INSERT INTO anexos (anexo_mensaje_id,anexo_nombre_publico,anexo_nombre_privado,anexo_tipo)\
  VALUES ($1,$2,$3,$4)\
  RETURNING anexo_id;',
  OBTENER_ANEXOS:'SELECT anexo_nombre_publico, anexo_nombre_privado FROM anexos\
  WHERE anexo_mensaje_id=$1;',
  BORRAR_ANEXOS: 'DELETE FROM anexos\
  WHERE anexo_mensaje_id=$1;'
}
