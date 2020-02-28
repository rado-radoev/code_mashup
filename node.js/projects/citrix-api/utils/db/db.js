const sql = require('mssql');
require('msnodesqlv8');

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.DB_HOST,
    domain: process.env.DOMAIN,
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    },
    parseJSON: true
}

const rebootSchedules = async (location) => {
    try {
        let pool = new sql.ConnectionPool(config); 
        let conn = await pool.connect();
        let result1 = await pool.request().query(`SELECT * FROM dbo.${location}`)
        return result1
    } catch (error) {
        console.log(error)
    }
};

const servers = async () => {
    try {
        let pool = new sql.ConnectionPool(config);
        let conn = await pool.connect();
        let result = await pool.request().query(`SELECT * FROM dbo.Servers`)
        return result;
    } catch (error) {
        return error;
    }
}

const applications = async () => {
    try {
        let pool = new sql.ConnectionPool(config);
        let conn = await pool.connect();
        let result = await pool.request().query('SELECT * FROM dbo.Applications');
        return result;
    } catch (error) {
        return error
    }
}

const deliveryGroups = async() => {
    try {
        let pool = new sql.ConnectionPool(config);
        let conn = await pool.connect();
        let result = await pool.request().query('SELECT * FROM dbo.DeliveryGroups')
        console.log(result)
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    rebootSchedules,
    servers,
    applications,
    deliveryGroups
}

// sql.on('error', err => {
//     console.log(err)
// });

