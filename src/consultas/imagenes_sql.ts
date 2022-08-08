export const SQL_IMAGENES ={
  ACTUALIZAR_IMAGEN: 'DELETE FROM imagenes\
  WHERE img_usuario_id=$1;\
  INSERT INTO imagenes (img_usuario_id,img_nombre_publico,img_nombre_privado,img_tipo)\
  VALUES ($1,$2,$3,$4)\
  RETURNING img_id;',
  VERIFICAR_IMAGEN:'SELECT COUNT(img_id) FROM imagenes\
  WHERE img_usuario_id=$1;',
  BORRAR_IMAGEN:'SELECT img_nombre_privado FROM imagenes\
  WHERE img_usuario_id=$1;'
}
