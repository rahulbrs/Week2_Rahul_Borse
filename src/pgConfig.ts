import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testorder',
    password: 'root',
    port: 5432,
});

export default pool;