
const jwt = require('jsonwebtoken')

exports.validateRegister = (req, res, next) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!req.body.username || !req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ msg: 'Invalid input...' })
    }

    if (!req.body.username || req.body.username.length < 4) {
        return res.status(400).json({ msg: 'Please enter valid username' })
    }


    if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).json({ msg: 'Please enter valid password' })
    }

    if (!req.body.repeat || req.body.password !== req.body.repeat) {
        return res.status(400).json({ msg: 'Passwords dont match...' })
    }



    if (!regex.test(req.body.email)) {
        return res.status(400).json({ msg: 'invalid email...' })
    }
    console.log('reg middlewares...')
    next()
}

exports.validateLogin = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: 'Invalid input...' })
    }
    console.log('login middlewares...')
    next()
}

exports.auth = (req, res, next) => {

    const node_token = req.cookies['node-token']
    try {
        const user = jwt.verify(node_token, process.env.SECRET)
        req.user = user
        console.log('You are auth...')
        next()
    } catch (error) {
        res.clearCookie('node-token')
        return res.status(400).json({ msg: 'Auth failed!!!' })
    }
}
