const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sql_lib = require('mysql')

const app = express();
const port = 3000;
const sql = sql_lib.createPool({
    host: '192.168.1.5',
    user: 'fbla_user',
    password: 'orlando2024',
    database: 'fblaproject2024_node',
    waitForConnections: true
})

// Use middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use session middleware
app.use(session({
    secret: '8oieahtf98oresyg98oeashgoASHKUgh9898432uhijksfx@',
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

function checkPassword(user, password, connection, callback) {
    connection.query('SELECT password FROM userData WHERE username = ?', [user], (queryError, results) => {
        connection.release()
        if (queryError) {
            callback(queryError, null)
            return
        }

        callback(null, results[0].password == password)
    })
}

function getList(user, connection, callback) {
    connection.query('SELECT companyList FROM userData WHERE username = ?', [user], (queryError, results) => {
        connection.release()
        //console.log(results)
        if (queryError) {
            callback(queryError, null)
            return
        }
        callback(null, JSON.parse(results[0].companyList))
    })
}

function setList(user,data, connection, callback) {
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

                        res.status(200)
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

            userExists(req.session.user, connection, true, (queryError, userExistsResult) => {
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
                    getList(req.session.user, connection, (queryError, listResult) => {
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

            userExists(req.session.user, connection, true, (queryError, userExistsResult) => {
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
                    setList(req.session.user, data, connection, (queryError, result) => {
                        if (queryError) {
                            console.error('Error checking user existence:', queryError)
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
                checkPassword(username, password, connection, (queryError, passwordMatchResult) => {
                    if (queryError) {
                        console.error('Error checking user existence:', queryError)
                        res.status(500).send('Internal Server Error')
                        return
                    }

                    if (!passwordMatchResult) {
                        res.status(401).json({ success: false, message: 'Invalid Password' })
                        return
                    }

                    req.session.user = username
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