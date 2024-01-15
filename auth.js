const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));

// Serve your public files (like HTML, CSS, JS) from a public folder
app.use("/", express.static('public'));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
    
// });
// app.get('/styles.css', (req, res) => {
//     res.sendFile(__dirname + '/public/styles.css');
    
// });
// app.get('/universalStyles.css', (req, res) => {
//     res.sendFile(__dirname + '/public/universalStyles.css');
    
// });
// app.get('/webapp.js', (req, res) => {
//     res.sendFile(__dirname + '/public/webapp.js');
    
// });

// app.get('/images', (req, res) => {
//     res.sendFile(__dirname + '/public/webapp.js');
    
// });

// app.get('/fonts/abel.ttf', (req, res) => {
//     res.sendFile(__dirname + '/public/fonts/abel.ttf');
    
// });


// Your authentication routes go here
app.get("/")

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
    res.redirect('/'); // Redirect to login if not authenticated
};

function getPanelPage()
{
    const pages = ['index.html', 'googleAPI.js', 'panel.css', 'panel.js']
    for(const page of pages)
    {
        app.get(`/panel/${page === 'index.html' ? "" : page}`, authenticateUser, (req, res) => {
            res.sendFile(__dirname + `/panel/${page}`)
        })
    }
}
getPanelPage()

app.get('/panel', authenticateUser, (req, res) => {
    res.redirect("/panel/")
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulated authentication logic (replace with your actual logic)
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        req.session.user = user;
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ success: true });
});

// // Protected panel route
// app.get('/panel', authenticateUser, (req, res) => {
//     console.log(authenticateUser)
//     if(authenticateUser) {
//         res.sendFile(__dirname + '/panel/index.html');
//     } else {
//         res.redirect('/')
//     }
// });

// app.get('/panel/panel.js', authenticateUser, (req, res) => {
//     console.log(authenticateUser)
//     if(authenticateUser) {
//         res.sendFile(__dirname + '/panel/panel.js');
//     } else {
//         res.redirect('/')
//     }
// });

// app.get('/panel/panel.css', authenticateUser, (req, res) => {
//     console.log(authenticateUser)
//     if(authenticateUser) {
//         res.sendFile(__dirname + '/panel/panel.css');
//     } else {
//         res.redirect('/')
//     }
// });

// app.get('/panel/googleAPI.js', authenticateUser, (req, res) => {
//     console.log(authenticateUser)
//     if(authenticateUser) {
//         res.sendFile(__dirname + '/panel/googleAPI.js');
//     } else {
//         res.redirect('/')
//     }
// });