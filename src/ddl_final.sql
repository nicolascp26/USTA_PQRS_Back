CREATE TABLE acceso (
    acceso_usuario_id  INTEGER NOT NULL PRIMARY KEY,
    acceso_correo       VARCHAR(100) UNIQUE NOT NULL,
    acceso_clave        VARCHAR(150) NOT NULL
);

ALTER TABLE acceso
ADD CONSTRAINT constraint_name UNIQUE (acceso_correo);

CREATE TABLE anexos (
    anexo_id             SERIAL NOT NULL PRIMARY KEY,
    anexo_mensaje_id       INTEGER NOT NULL,
    anexo_nombrepublico  VARCHAR(200),
    anexo_nombreprivado  VARCHAR(200),
    anexo_tipo           VARCHAR(50)
);

CREATE TABLE imagenes (
    img_id              SERIAL NOT NULL PRIMARY KEY,
    img_usuario_id  INTEGER NOT NULL,
    img_nombrepublico   VARCHAR(200),
    img_nombreprivado   VARCHAR(200),
    img_tipo            VARCHAR(50)
);

CREATE TABLE mensaje (
    mensaje_id              SERIAL NOT NULL PRIMARY KEY,
    mensaje_codpadre        INTEGER,
    mensaje_id_solicita     INTEGER,
    mensaje_id_responde     INTEGER,
    mensaje_estado          INTEGER,
    mensaje_prioridad       INTEGER,
    mensaje_titulo          VARCHAR(200) NOT NULL,
    mensaje_detalle         TEXT NOT NULL,
    mensaje_fecha           DATE NOT NULL DEFAULT CURRENT_DATE,
    mensaje_hora            TIME NOT NULL DEFAULT CURRENT_TIME(0),
    mensaje_tipo_id         INTEGER
);

CREATE TABLE roles (
    rol_id      SERIAL NOT NULL PRIMARY KEY,
    rol_nombre  VARCHAR(15) NOT NULL
);

CREATE TABLE tipo (
    tipo_id      SERIAL NOT NULL PRIMARY KEY,
    tipo_clase VARCHAR(50) NOT NULL,
    tipo_nombre  VARCHAR(200) NOT NULL
);

CREATE TABLE usuario (
    usuario_id         SERIAL NOT NULL PRIMARY KEY,
    usuario_nombres    VARCHAR(50) NOT NULL,
    usuario_apellidos  VARCHAR(50) NOT NULL,
    usuario_documento  VARCHAR(30) NOT NULL,
    usuario_telefono   VARCHAR(20),
    usuario_rol        INTEGER NOT NULL,
    usuario_estado     INTEGER
);

ALTER TABLE acceso
    ADD CONSTRAINT acceso_usuario_fk FOREIGN KEY ( acceso_usuario_id )
        REFERENCES usuario ( usuario_id );

ALTER TABLE anexos
    ADD CONSTRAINT anexos_mensaje_fk FOREIGN KEY ( anexo_mensaje_id )
        REFERENCES mensaje ( mensaje_id );

ALTER TABLE imagenes
    ADD CONSTRAINT imagenes_usuario_fk FOREIGN KEY ( img_usuario_id )
        REFERENCES usuario ( usuario_id );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_codpadre_fk FOREIGN KEY ( mensaje_codpadre )
        REFERENCES mensaje ( mensaje_id );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_usuario_solicita_fk FOREIGN KEY ( mensaje_id_solicita )
        REFERENCES usuario ( usuario_id );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_usuario_responde_fk FOREIGN KEY ( mensaje_id_responde )
        REFERENCES usuario ( usuario_id );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_tipo_fk FOREIGN KEY ( mensaje_tipo_id )
        REFERENCES tipo ( tipo_id );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_roles_fk FOREIGN KEY ( usuario_rol )
        REFERENCES roles ( rol_id );


------------------DML--------------------

INSERT INTO roles (rol_nombre) values
 ('Administrador'),
 ('Estudiante');

INSERT INTO usuario (usuario_nombres, usuario_apellidos,usuario_documento,usuario_telefono,usuario_rol,usuario_estado) values
 ('Luz Elena', 'Gutierrez','12346789','3115550000',1,1);

INSERT INTO acceso (acceso_usuario_id,acceso_correo,acceso_clave) values
 (1,'decsistemas@ustatunja.edu.co', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413');

INSERT INTO imagenes (img_usuario_id,img_nombrepublico, img_nombreprivado,img_tipo) VALUES
	(1,'miFoto.png','oMdbjaYzO7.png','image/png');

INSERT INTO tipo (tipo_nombre) values
 ('Reclamo - Materias'),
 ('Queja - Docentes'),
 ('Queja - Infraestructura');

 INSERT INTO mensaje (mensaje_codpadre,mensaje_id_solicita, mensaje_id_responde,mensaje_estado,mensaje_prioridad,mensaje_titulo,mensaje_detalle,mensaje_tipo_id) values
 (null,6,1,1,1,'Abran todos los ascensores','Buenas tardes facultad, les escribo para pedirles que abran los ascensores, gracias.👀',3),
 (1,null,null,null,null,'Re: Respuesta', 'Buenas tardes Alejandro, ASAP 😀',null),
  (1,null,null,null,null,'Re: Respuesta', 'Gracias',null);

  WITH RECURSIVE hilo_mensajes AS (
          SELECT mensaje_id, mensaje_codpadre, mensaje_titulo, mensaje_detalle
          FROM mensaje
          WHERE mensaje_id = 1
      UNION ALL
          SELECT msj.mensaje_id, msj.mensaje_codpadre, msj.mensaje_titulo, msj.mensaje_detalle
      	FROM mensaje msj
  		JOIN hilo_mensajes ON msj.mensaje_codpadre = hilo_mensajes.mensaje_id
  )

  SELECT * FROM hilo_mensajes;
