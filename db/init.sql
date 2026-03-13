CREATE TABLE IF NOT EXISTS profesores (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  departamento TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clases (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  profesor_id INTEGER REFERENCES profesores(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS horarios (
  id SERIAL PRIMARY KEY,
  profesor_id INTEGER REFERENCES profesores(id) ON DELETE CASCADE,
  clase TEXT NOT NULL,
  dia TEXT NOT NULL,
  bloques INT[] NOT NULL
);

CREATE TABLE IF NOT EXISTS registros (
  id SERIAL PRIMARY KEY,
  profesor_id INTEGER REFERENCES profesores(id) ON DELETE CASCADE,
  clase_id INTEGER REFERENCES clases(id),
  salon TEXT NOT NULL,
  bloques INT[] NOT NULL,
  registrado TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO profesores (nombre, departamento)
VALUES
  ('Laura S?nchez', 'Matem?ticas'),
  ('Tom?s Rivera', 'Ingenier?a'),
  ('Valeria Paredes', 'F?sica');

INSERT INTO clases (nombre, profesor_id)
VALUES
  ('C?lculo II', 1),
  ('C?lculo III', 1),
  ('Circuitos Digitales', 2),
  ('Redes de Datos', 2),
  ('Mec?nica Cu?ntica', 3);

INSERT INTO horarios (profesor_id, clase, dia, bloques)
VALUES
  (1, 'C?lculo II', 'Lunes', ARRAY[1,2]),
  (1, 'C?lculo III', 'Mi?rcoles', ARRAY[3,4]),
  (2, 'Circuitos Digitales', 'Martes', ARRAY[1,2]),
  (2, 'Redes de Datos', 'Jueves', ARRAY[3,4]),
  (3, 'Mec?nica Cu?ntica', 'Viernes', ARRAY[2,3]);

INSERT INTO registros (profesor_id, clase_id, salon, bloques)
VALUES
  (1, 1, 'Salon 101', ARRAY[1,2]);
