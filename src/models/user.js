const mysql = require('mysql');

//conected mysql node
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
});

//define  objet  model User 
let userModel = {};

userModel.getUsers = callback => {
    if (connection) {
        connection.query(`select * from users order by id`, (err, rows) => {
            if (err) {
                throw err
            } else {
                callback(null, rows);
            }
        })
    }
}

userModel.insertUser = (userObjet, callback) => {
    if (connection) {
        connection.query('insert into users set ?', userObjet, (err, rows) => {
            if (err) {
                throw err
            } else {
                callback(null, rows)
            }
        })
    }
}

userModel.updateUser = (userObjet, callback) => {
    if (connection) {
        let sql = `
            update users set
            username = ${connection.escape(userObjet.username)},
            email = ${connection.escape(userObjet.email)},
            password = ${connection.escape(userObjet.password)}
            where id = ${connection.escape(userObjet.id)}
        `;
        connection.query(sql, (err, rows) => {
            if (err) {
                throw err
            } else {
                callback(null, {
                    msg: "Data success update"
                })
            }
        })
    }
}

userModel.deleteUser = (id, callback) => {
    if (connection) {
        let sql = `select id from users where id = ${connection.escape(id)}`
        connection.query(sql, (err, rows) => {
            if (rows) {
                let sql = `delete from users where id = ${connection.escape(id)}`
                connection.query(sql, (err, results) => {
                    if (err) {
                        throw err
                    } else {
                        callback(null, {
                            msg: "Data success delete"
                        })
                    }
                })
            } else {
                callback(null, {
                    msg: "Not exists"
                })
            }
        })
    }
}

module.exports = userModel;