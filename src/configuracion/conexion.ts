import variables from './config';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const pool = pgp(variables);

pool.connect().then(con => {
  console.log('Conexion exitosa! Con la BD: ', variables.database);
  con.done();
}).catch(miError => {
  console.log('El error: ', miError.code);
});

export default pool;
