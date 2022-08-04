export const SQL_IMAGENES ={
  CREAR_IMAGEN: 'INSERT INTO imagenes (img_usuario_id,img_nombre_publico,img_nombre_privado,img_tipo)\
  VALUES ($1,$2,$3,$4)\
  RETURNING img_id;',
  ELIMINAR_IMAGEN: 'DELETE FROM imagenes\
  WHERE img_usuario_id=$1\
  RETURNING img_id;',
}
