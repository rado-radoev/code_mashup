const sql = require('mssql');
require('msnodesqlv8');

const config = {
    user: 'radra',
    password: 'Superzebra85',
    database: process.env.DATABASE,
    server: process.env.DB_HOST,
    domain: process.env.DOMAIN,
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    },
    parseJSON: true
}

exports.Query = async () => {
    try {
        let pool = new sql.ConnectionPool(config); 
        let conn = await pool.connect()
        let result1 = await pool.request().query('SELECT * FROM dbo.RSM').then(result => {
            return result;
        })
        return result1
    } catch (error) {
        console.log(error)
    }
};

// sql.on('error', err => {
//     console.log(err)
// });

