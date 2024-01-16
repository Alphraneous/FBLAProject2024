const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sql_lib = require('mysql')

const app  = express();
const port = 3000;
const sql = sql_lib.createPool({
    host: 'localhost',
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

function getPanelPage()
{
    const pages = ['index.html', 'googleAPI.js', 'panel.css', 'panel.js']
    for(const page of pages)
    {
        app.get(`/${page === 'index.html' ? "" : page}`, authenticateUser, (req, res) => {
            res.sendFile(__dirname + `/panel/${page}`)
        })
    }
}
getPanelPage()

function userExists(user, connection) 
{
    connection.query('SELECT COUNT(*) AS count FROM userData WHERE username = ?', [user], (queryError, results) => {

        connection.release()
  
        if (queryError) 
            return -1
  
        const usernameExists = results[0].count > 0
        return usernameExists
    })
}

app.get('/create', (req, res) => {
    const { name, username, password } = req.body

    sql.getConnection((err, connection) => {
        if (err) 
        {
            console.error('Error connecting to database:', err)
            res.status(500).send('Internal Server Error')
            return
        }

        const usernameExists = userExists(username, connection)
        switch(usernameExists)
        {
            case -1:
                console.error('Error executing query:', queryError)
                res.status(500).send('Internal Server Error')
                return
            case 0:
                connection.query('INSERT INTO userData (name, username, password) VALUES (?, ?, ?, ?)', [name, username, password, '[]'], (insertError) => {
                    connection.release()
        
                    if (insertError) 
                    {
                        console.error('Error inserting record:', insertError)
                        res.status(500).send('Internal Server Error')
                        return
                    }
        
                    res.status(200)
                })
                return
            case 1:
                res.status(409).send('Username Already Exists')
                return
        }
    })
})

app.get('/login' , (req, res) => {
    res.redirect("/login/")
});

// Login route
app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    
    sql.getConnection((err, connection) => {
        if (err) 
        {
            console.error('Error connecting to database:', err)
            res.status(500).send('Internal Server Error')
            return
        }

        if (userExists(username, connection)) 
        {
            req.session.user = user
            res.status(200)
        } 
        else
            res.status(401).json({ success: false, message: 'Invalid credentials' })
    })
})

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ success: true });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + `/error/errorPage.html`)
});