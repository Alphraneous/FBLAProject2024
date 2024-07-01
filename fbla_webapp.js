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

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login/'); // Redirect to login if not authenticated
};

//Serve files for the application page individually
function getPanelPage() {
    const pages = ['index.html', 'googleAPI.js', 'panel.css', 'panel.js']
    for (const page of pages) {
        app.get(`/${page === 'index.html' ? "" : page}`, authenticateUser, (req, res) => {
            res.sendFile(__dirname + `/panel/${page}`)
        })
    }
}
//Call above function
getPanelPage()

//Check for existing user when making one
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

//Check password hash against entered password
function checkPassword(user, hashedPassword, connection, release, callback) {
    connection.query('SELECT password,name FROM userData WHERE username = ?', [user], (queryError, results) => {
        if(release) {
            connection.release()
        }
        if (queryError) {
            callback(queryError, null)
            return
        }

        callback(null, {result: results[0].password == hashedPassword, name: results[0].name})
    })
}

const isValidSHA256 = (hash) => /^[a-fA-F0-9]{64}$/.test(hash)

function setPassword(user, newHashedPassword, connection, callback) {

    if(!isValidSHA256(newHashedPassword))
        callback('Invalid password - non SHA256 hash', false)

    connection.query('UPDATE userData SET password = ? WHERE username = ?', [newHashedPassword,user], (queryError, results) => {
        connection.release()
        if (queryError) {
            callback(queryError, false)
            return
        }
        callback(null, true)
    })
}

//Route to get the companies list
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

//Route to set the companieslist
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
        if (queryError) {
            callback(queryError, false)
            return
        }
        callback(null, true)
    })
}

app.post('/create', (req, res) => {
    const { name, username, password } = req.body
    

    if(!isValidSHA256(password))
        res.status(400).send('Invalid password - non SHA256 hash')

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

    if(!isValidSHA256(password) || !isValidSHA256(newPassword))
        res.status(400).send('Invalid password - non SHA256 hash')

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
})

app.post('/delete', (req, res) => {
    const password = req.body.password;

    if(!isValidSHA256(password))
        res.status(400).send('Invalid password - non SHA256 hash')

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

    if(!isValidSHA256(password))
        res.status(400).status('Invalid password - non SHA256 hash')

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
                //console.log("Username not found")
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

async function perplexityPrompt(prompt, callback) {
    try {
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer ' + process.env.PERPLEXITY_API_KEY
            },
            body: JSON.stringify({
              model: 'llama-3-sonar-small-32k-online',
              messages: [
                {role: 'system', content: '\
                    Format the data in JSON using the following as a template:\
                    {\r\n    \"name\": \"name\",\r\n    \"services\": [ \"service 1, add up to 3 services\"],\r\n    \"description\": \"description\",\r\n    \"address\": \"address\",\r\n    \"yearFounded\": \"yearFounded\",\r\n    \"websiteURL\": \"website\",\r\n    \"contact\": {\r\n      \"name\": \"contactName\",\r\n      \"number\": \"000-000-0000)\",\r\n      \"email\": \"contactEmail\"\r\n    }\r\n  }'
                },
                {role: 'user', content: prompt}
              ]
            })
        };
        let response = await fetch('https://api.perplexity.ai/chat/completions', options)
        .then(response => response.json())
        .then(response => {callback(true, response)})
        .catch(err => console.log(err));
        
    }
    catch(error) {
        console.log(error)
        callback(false, null)
    }
}

app.post('/prompt', async (req, res) => {
    const { prompt } = req.body;
    if (req.session && req.session.user) {
        if(!prompt)
            return res.status(400).send('Prompt is required')

        try {
            perplexityPrompt(prompt, (success, response) => {
                if(success) {
                    res.json(response)
                } else {
                    res.status(500).send('An error occurred while processing the request')
                }
            })
        }
        catch(error) {
            console.error('Error on AI prompt response: ', error)
            res.status(500).send('An error occurred while processing the request')
        }
    } else {
        res.status(401).send('Stop trying to use my damn AI this shit aint free')
    }   
})
