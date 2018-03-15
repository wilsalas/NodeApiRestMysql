const userModel = require('../models/user');

module.exports = Router = (router) => {

    const userData = (req, type) => {
        return {
            id: type == 'i' ? null : req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        }
    }

    router.get('/users', (req, res) => {
        userModel.getUsers((err, data) => {
            res.status(200).json(data)
        })
    })

    router.post('/users', (req, res) => {
        userModel.insertUser(userData(req, 'i'), (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: "ERROR"
                })
            }
        })
    })

    router.put('/users/:id', (req, res) => {
        userModel.updateUser(userData(req, 'u'), (err, data) => {
            if (data) {
                res.json({
                    success: true,
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: "ERROR"
                })
            }
        })
    })

    router.delete('/users/:id', (req, res) => {
        userModel.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg != "") {
                res.json({
                    success: true,
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: "ERROR"
                })
            }
        })
    })

}