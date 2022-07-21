export const SQL_TIPOS = {
  OBTENER_TIPO: 'select tipo_id, tipo_clase, tipo_nombre \
  FROM tipo WHERE tipo_id = $1',

  CREAR_TIPO: "INSERT INTO tipo (tipo_clase, tipo_nombre) \
    VALUES ($1,$2)",

  TODOS: 'select t.tipo_id, t.tipo_clase, t.tipo_nombre, \
  (select count(m.mensaje_id) from mensaje m where m.mensaje_tipo_id = t.tipo_id) as cant_tipo \
  from tipo t \
  order by t.tipo_clase',

  ELIMINAR: 'DELETE FROM tipo WHERE tipo_id = $1',

  ACTUALIZAR: 'UPDATE tipo \
  SET tipo_clase = $2, tipo_nombre = $3 \
  WHERE tipo_id = $1'
}
