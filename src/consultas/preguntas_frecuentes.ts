export const SQL_PREGUNTAS_FRECUENTES = {
  OBTENER_PREGUNTAS: 'SELECT pref_id, pref_titulo, pref_detalle \
  FROM preguntas_frecuentes',

  OBTENER_PREGUNTA_UNICA: 'SELECT pref_id, pref_titulo, pref_detalle \
  FROM preguntas_frecuentes\
  WHERE pref_id = $1',

  CREAR_PREGUNTA: "INSERT INTO preguntas_frecuentes (pref_titulo,pref_detalle) \
  VALUES ($1,$2)",

  ELIMINAR_PREGUNTA: 'DELETE FROM preguntas_frecuentes WHERE pref_id = $1',

  ACTUALIZAR_PREGUNTA: 'UPDATE preguntas_frecuentes\
  SET pref_titulo = $2, pref_detalle = $3\
  WHERE pref_id = $1'
}
