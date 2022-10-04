CREATE TABLE acceso (
    acceso_usuario_id  INTEGER NOT NULL PRIMARY KEY,
    acceso_correo       VARCHAR(100) UNIQUE NOT NULL,
    acceso_clave        VARCHAR(150) NOT NULL
);

CREATE TABLE anexos (
    anexo_id             SERIAL NOT NULL PRIMARY KEY,
    anexo_mensaje_id       INTEGER NOT NULL,
    anexo_nombre_publico  VARCHAR(200),
    anexo_nombre_privado  VARCHAR(200),
    anexo_tipo           VARCHAR(50)
);

CREATE TABLE imagenes (
    img_id              SERIAL NOT NULL PRIMARY KEY,
    img_usuario_id  INTEGER NOT NULL,
    img_nombre_publico   VARCHAR(200),
    img_nombre_privado   VARCHAR(200),
    img_tipo            VARCHAR(50)
);

CREATE TABLE mensaje (
    mensaje_id              SERIAL NOT NULL PRIMARY KEY,
    mensaje_codpadre        INTEGER,
    mensaje_id_usuario      INTEGER,
    mensaje_estado          INTEGER,
    mensaje_titulo          VARCHAR(200) NOT NULL,
    mensaje_detalle         TEXT NOT NULL,
    mensaje_fecha           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    mensaje_actualizado     TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
    mensaje_tipo_id         INTEGER,
    mensaje_usuario_asignado INTEGER
);

CREATE TABLE roles (
    rol_id      INTEGER NOT NULL PRIMARY KEY,
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

CREATE TABLE preguntas_frecuentes (
    pref_id              SERIAL NOT NULL PRIMARY KEY,
    pref_titulo          VARCHAR(200) NOT NULL,
    pref_detalle         TEXT NOT NULL
);

ALTER TABLE acceso
ADD CONSTRAINT acceso_correo_unico UNIQUE (acceso_correo);

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
    ADD CONSTRAINT mensaje_usuario_solicita_fk FOREIGN KEY ( mensaje_id_usuario )
        REFERENCES usuario ( usuario_id );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_tipo_fk FOREIGN KEY ( mensaje_tipo_id )
        REFERENCES tipo ( tipo_id );

ALTER TABLE mensaje
    ADD CONSTRAINT mensaje_usuario_asignado_fk FOREIGN KEY ( mensaje_usuario_asignado )
        REFERENCES usuario ( usuario_id );

ALTER TABLE usuario
    ADD CONSTRAINT usuario_roles_fk FOREIGN KEY ( usuario_rol )
        REFERENCES roles ( rol_id );


------------------DML OBLIGATORIO--------------------

INSERT INTO roles (rol_id, rol_nombre) values
 (1,'Administrador'),(2,'Estudiante'),(3,'Docente'),(4,'Invitado');

INSERT INTO tipo (tipo_clase,tipo_nombre) VALUES
('Peticion','Cancelacion de materia'),('Peticion','Cambio de grupo'),('Peticion','Inclusion de materia'),('Peticion','Otra'),
('Queja','Dificultad con docente'),('Queja','Solicitud no atendida (dependencia externa)'),('Queja','Otra'),
('Reclamo','Cobros y recaudos'),('Reclamo','Otra'),
('Sugerencia','Cualquiera');

INSERT INTO preguntas_frecuentes (pref_titulo,pref_detalle) VALUES
('Como registrarme en el sistema de PQRS?','Con tu usuario y contraseña del SAC!✅'),
('Donde esta la facultad?','Esta ubicada en el Edificio Santo Domingo, 4 Piso'),
('Perdi mi carnet, que hago?','Debes realizar los siguientes pasos:
- Denunciar la perdida en la pagina de la POLICIA NACIONAL
- Pagar el nuevo carnet
- Reclamarlo en Facultad'),
('Como enviar la propuesta de grado?','Debes enviar un correo al Comite de trabajos de grado: fistrabajogrado@ustatunja.edu.co, Ellos te asignaran un revisor, el cual dara el visto bueno o sugerira cambios a la propuesta.🦎');

INSERT INTO usuario (usuario_nombres, usuario_apellidos,usuario_documento,usuario_telefono,usuario_rol,usuario_estado) values
 ('Luz Elena', 'Gutierrez','12346789','3115550000',1,1);

INSERT INTO acceso (acceso_usuario_id,acceso_correo,acceso_clave) values
 (1,'decsistemas@ustatunja.edu.co', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413');
