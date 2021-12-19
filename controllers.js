const db = require('./db')
const jwt = require('jsonwebtoken')

exports.createDb = (req, res) => {
    let sql = "CREATE DATABASE nodemysql"
    db.query(sql, (err) => {
        if (err) {
            throw err
        }
        res.send('database created...')
    })
}

exports.createTable = (req, res) => {
    const sql = 'CREATE TABLE user(id int AUTO_INCREMENT, username VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255), avatar VARCHAR(255), PRIMARY KEY(id)) '
    db.query(sql, (err) => {
        if (err) {
            throw err
        }
        res.send('user created...')
    })
}

exports.registerUser = (req, res) => {
    const { username, email, password, firstname, lastname } = req.body

    const avatar = req.file.filename
    db.query(`SELECT id FROM user WHERE username = '${username}'`, (err, result) => {
        if (result.length) return res.status(400).json({ msg: 'Username already in use...' })
    })

    db.query(`SELECT id FROM user WHERE email = '${email}'`, (err, result) => {
        if (result.length) return res.status(400).json({ msg: 'Email already in use...' })
    })

    db.query('INSERT INTO user SET ?', { username, email, firstname, lastname, password, avatar }, err => {
        if (err) {
            throw err
        }
        res.send('an user added...')
    })
}

exports.loginUser = (req, res) => {
    const { username, password } = req.body

    db.query(`SELECT * FROM user WHERE username = '${username}'`, (err, result) => {
        console.log(result[0])
        const payload = { ...result[0] }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" })
        if (result.length && password === result[0].password) {
            res.cookie('node-token', token, { httpOnly: true })
            return res.status(200).json({ msg: `${username} is logged...`, token })

        }
        else {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

    })


}

exports.showUsers = (req, res) => {
    const sql = 'SELECT * FROM user'
    db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json({ results })
        console.log(results)
    })
}

exports.updateUser = (req, res) => {
    const { username, email, password, firstname, lastname } = req.body
    const avatar = req.gile.filename
    const sql = `UPDATE user SET username = ?, email =?, firstname =?, lastname = ?,password = ?,avatar = ?  WHERE id = ${req.params.id}`
    db.query(sql, [username, email, firstname, lastname, password, avatar], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json({ result })
        console.log('updated...')
    })

}

exports.resetPassword = (req, res) => {
    const { email, new_password } = req.body
    db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
        if (result.length) {
            const sql = `UPDATE user SET password = ?  WHERE email = '${email}'`
            db.query(sql, [new_password], (err, result) => {
                if (err) {
                    throw err
                }
                res.status(200).json({ msg: 'password is set' })

            })

        }
        res.status(400).json({ msg: 'Couldnt set the new password...' })
    })


}

exports.deleteUser = (req, res) => {

    const sql = `DELETE FROM user WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json({ msg: 'Deleted...' })

    })

}

exports.userPicture = (req, res) => {
    //console.log(req.file)

    const sql = `UPDATE user SET avatar = ? WHERE id = ${req.params.id}`
    db.query(sql, [req.file.filename], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json({ result })
        console.log('avatar added ...')
    })
}

exports.testRequest = (req, res) => {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)
}