const mysql = require('mysql')



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodemysql',
    password: ''
})
connection.connect(err => {
    if (err) {
        throw err
    }
    console.log('connected to DB...')
})



module.exports = connection