require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sql_lib = require('mysql')

const app = express();
const port = process.env.PORT || 3000;
const sql = sql_lib.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true
})

// Use middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

// function uponConnection(req, res, next)
// {
//     req.session.counter = (req.session.counter || 0) + 1;
//     console.log(`Custom code executed for user ${req.sessionID}. Counter: ${req.session.counter}`);
//     next();
// }

// Serve your public files (like HTML, CSS, JS) from a public folder
app.use("/login/", express.static('public'));
// app.use(uponConnection)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const users = [
    { username: 'user', password: 'password' },
    { username: 'user2', password: 'password2' },
    { username: 'a', password: 'a' }
];

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login/'); // Redirect to login if not authenticated
};

function getPanelPage() {
    const pages = ['index.html', 'googleAPI.js', 'panel.css', 'panel.js']
    for (const page of pages) {
        app.get(`/${page === 'index.html' ? "" : page}`, authenticateUser, (req, res) => {
            res.sendFile(__dirname + `/panel/${page}`)
        })
    }
}
getPanelPage()

function userExists(user, connection, released, callback) {
    connection.query('SELECT username FROM userData WHERE username = ?', [user], (queryError, results) => {
        if (!released)
            connection.release()

        if (queryError) {
            callback(queryError, null)
            return -1
        }

        callback(null, results.length > 0)
    })
}

function checkPassword(user, password, connection, release, callback) {
    connection.query('SELECT password,name FROM userData WHERE username = ?', [user], (queryError, results) => {
        if(release){connection.release()}
        if (queryError) {
            callback(queryError, null)
            return
        }

        callback(null, {result: results[0].password == password, name: results[0].name})
    })
}

function setPassword(user, newPassword, connection, callback) {
    connection.query('UPDATE userData SET password = ? WHERE username = ?', [newPassword,user], (queryError, results) => {
        connection.release()
        if (queryError) {
            callback(queryError, false)
            return
        }
        callback(null, true)
    })
}

function getList(req, user, connection, callback) {
    connection.query('SELECT companyList FROM userData WHERE username = ?', [user], (queryError, results) => {
        connection.release()
        //console.log(results)
        if (queryError) {
            callback(queryError, null)
            return
        }
        let data = {name: req.session.user.name, companyList: JSON.parse(results[0].companyList)}
        callback(null, data)
    })
}

function setList(user, data, connection, callback) {
    connection.query('UPDATE userData SET companyList = ? WHERE username = ?', [JSON.stringify(data),user], (queryError, results) => {
        connection.release()
        //console.log(results)
        if (queryError) {
            callback(queryError, false)
            return
        }
        callback(null, true)
    })
}

function setName(user, newName, connection, callback) {
    connection.query('UPDATE userData SET name = ? WHERE username = ?', [newName, user], (queryError, results) => {
        connection.release()
        //console.log(results)
        if (queryError) {
            callback(queryError, false)
            return
        }
        callback(null, true)
    })
}

function accDelete(user, connection, callback) {
    connection.query('DELETE FROM userData WHERE username = ?', [user], (queryError, results) => {
        connection.release()
        //console.log(results)
        if (queryError) {
            callback(queryError, false)
            return
        }
        callback(null, true)
    })
}

app.post('/create', (req, res) => {
    const { name, username, password } = req.body

    sql.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err)
            res.status(500).send('Internal Server Error')
            return
        }

        userExists(username, connection, true, (queryError, userExistsResult) => {
            if (queryError) {
                console.error('Error checking user existence:', queryError)
                res.status(500).send('Internal Server Error')
                return
            }

            switch (userExistsResult) {
                default:
                case -1:
                    console.error('Error executing query:', queryError)
                    res.status(500).send('Internal Server Error')
                    return
                case false:
                    connection.query('INSERT INTO userData (name, username, password, companyList) VALUES (?, ?, ?, ?)', [name, username, password, '[]'], (insertError) => {
                        connection.release()

                        if (insertError) {
                            console.error('Error inserting record:', insertError)
                            res.status(500).send('Internal Server Error')
                            return
                        }

                        res.status(200).send('Account created successfully')
                    })
                    return
                case true:
                    res.status(409).send('Username Already Exists')
                    return
            }
        })
    })
})

app.get('/login', (req, res) => {
    res.redirect("/login/")
});

app.post('/getCList', (req, res) => {
    if (req.session && req.session.user) {
        sql.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err)
                res.status(500).send('Internal Server Error')
                return
            }

            userExists(req.session.user.username, connection, true, (queryError, userExistsResult) => {
                if (queryError) {
                    console.error('Error checking user existence:', queryError)
                    res.status(500).send('Internal Server Error')
                    return
                }

                if (!userExistsResult) {
                    res.status(401).json({ success: false, message: 'Username does not exist' })
                    return
                }
                else {
                    getList(req, req.session.user.username, connection, (queryError, listResult) => {
                        if (queryError) {
                            console.error('Error checking user existence:', queryError)
                            res.status(500).send('Internal Server Error')
                            return
                        }

                        if (!listResult) {
                            res.status(401).json({ success: false, message: 'Unidentified error' })
                            return
                        }
                        res.json(listResult)
                    })
                }
            })
        })
    }
})

app.post('/setCList', (req, res) => {
    if (req.session && req.session.user) {
        data = req.body
        sql.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err)
                res.status(500).send('Internal Server Error')
                return
            }

            userExists(req.session.user.username, connection, true, (queryError, userExistsResult) => {
                if (queryError) {
                    console.error('Error checking user existence:', queryError)
                    res.status(500).send('Internal Server Error')
                    return
                }

                if (!userExistsResult) {
                    res.status(401).json({ success: false, message: 'Username does not exist' })
                    return
                }
                else {
                    setList(req.session.user.username, data, connection, (queryError, result) => {
                        if (queryError) {
                            console.error('Unidentified query error:', queryError)
                            res.status(500).send('Internal Server Error')
                            return
                        }

                        if (!result) {
                            res.status(418).json({ success: false, message: 'List not set' })
                            return
                        }
                        res.status(200).send('List Set Successfully')
                    })
                }
            })
        })
    }
})

app.post('/setName', (req, res) => {
    if (req.session && req.session.user) {
        let newName = req.body.newName
        sql.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err)
                res.status(500).send('Internal Server Error')
                return
            }

            userExists(req.session.user.username, connection, true, (queryError, userExistsResult) => {
                if (queryError) {
                    console.error('Error checking user existence:', queryError)
                    res.status(500).send('Internal Server Error')
                    return
                }

                if (!userExistsResult) {
                    res.status(401).json({ success: false, message: 'Username does not exist' })
                    return
                }
                else {
                    setName(req.session.user.username, newName, connection, (queryError, result) => {
                        if (queryError) {
                            console.error('Unidentified query error:', queryError)
                            res.status(500).send('Internal Server Error')
                            return
                        }

                        if (!result) {
                            res.status(418).json({ success: false, message: 'List not set' })
                            return
                        }
                        res.status(200).send('Name Set Successfully')
                    })
                }
            })
        })
    }
})



app.post('/setPwd', (req, res) => {
    const { password, newPassword } = req.body;
    sql.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err)
            res.status(500).send('Internal Server Error')
            return
        }
        checkPassword(req.session.user.username, password, connection, false, (queryError, passwordMatchResult) => {
            if (queryError) {
                console.error('Error checking user existence:', queryError)
                res.status(500).send('Internal Server Error')
                return
            }

            if (!passwordMatchResult.result) {
                res.status(401).json({ success: false, message: 'Wrong Password' })
                return
            }
            setPassword(req.session.user.username, newPassword, connection, (queryError, passwordSetResult) => {
                if (queryError) {
                    console.error('Error checking user existence:', queryError)
                    res.status(500).send('Internal Server Error')
                    return
                }
    
                if (!passwordSetResult) {
                    res.status(401).json({ success: false, message: 'Unidentified password set error' })
                    return
                }
                res.status(200).send('Password Set Successfully')
            })
        })
    })
});

app.post('/delete', (req, res) => {
    const password = req.body.password;
    sql.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err)
            res.status(500).send('Internal Server Error')
            return
        }
        checkPassword(req.session.user.username, password, connection, false, (queryError, passwordMatchResult) => {
            if (queryError) {
                console.error('Error checking user existence:', queryError)
                res.status(500).send('Internal Server Error')
                return
            }

            if (!passwordMatchResult.result) {
                res.status(401).json({ success: false, message: 'Wrong Password' })
                return
            }
            accDelete(req.session.user.username, connection, (queryError, deletionResult) => {
                if (queryError) {
                    console.error('Error deleting user:', queryError)
                    res.status(500).send('Internal Server Error')
                    return
                }
    
                if (!deletionResult) {
                    res.status(400).json({ success: false, message: 'Unidentified user deletion error' })
                    return
                }
                res.status(200).send('User Deleted Successfully')
            })
        })
    })
});

app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    sql.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err)
            res.status(500).send('Internal Server Error')
            return
        }

        userExists(username, connection, true, (queryError, userExistsResult) => {
            if (queryError) {
                console.error('Error checking user existence:', queryError)
                res.status(500).send('Internal Server Error')
                return
            }

            if (!userExistsResult) {
                res.status(401).json({ success: false, message: 'Username does not exist' })
                console.log("username not found")
                return
            }
            else {
                checkPassword(username, password, connection, true, (queryError, passwordMatchResult) => {
                    if (queryError) {
                        console.error('Error checking user existence:', queryError)
                        res.status(500).send('Internal Server Error')
                        return
                    }

                    if (!passwordMatchResult.result) {
                        res.status(401).json({ success: false, message: 'Invalid Password' })
                        return
                    }

                    req.session.user = {username: username, name: passwordMatchResult.name}
                    res.status(200).send('Authenticated')
                })
            }
        })
    })
});


// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ success: true });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + `/error/errorPage.html`)
});