const quotes = [
    "In war, there is no prize for the runner-up",
    "Never fear something simply because others do",
    "The only thing we have to fear is fear itself",
    "You must be the change you wish to see in the world",
    "The only limit to our realization of tomorrow will be our doubts of today",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "When the impostor is sus",
    "The purpose of our lives is to be happy",
    "It is not enough to aim, you must hit",
    "Life is what happens when you're busy making other plans",
    "Self reflection is the greatest ability of a human being",
    "The only true wisdom is in knowing you know nothing",
    "The journey of a thousand miles begins with one step",
    "War does not determine who is right, only who is left",
    "Life is really simple, but we insist on making it complicated",
    "Victory outlasts truth",
    "Sometimes it is the people nobody imagines anything of who do the things nobody can imagine.",
    "Intel® Inside™",
    "Few know the violence it takes to make a peaceful man"
];
  
  // Feel free to use or modify these quotes as needed.
  

document.getElementById('easterEgg').innerHTML = quotes[Math.floor(Math.random() * quotes.length)]

const nameC = document.getElementById("nameC")
const userC = document.getElementById("userC")
const passC = document.getElementById("passC")

let darkModeCheckBox = true;

function toLogin()
{
    window.location.href = '/login/'
}

function createAccountShow() {
    document.getElementById("loginBox").style.display = "none"
    document.getElementById("createBox").style.display = "flex"
}

function createAccountHide() {
    document.getElementById("loginBox").style.display = "flex"
    document.getElementById("createBox").style.display = "none"
    nameC.value = ""
    userC.value = ""
    passC.value = ""
    
}

async function SHA256_hash(str)
{
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArr = Array.from(new Uint8Array(hashBuffer))
    return hashArr.map(byte => byte.toString(16).padStart(2, '0')).join('')   
}

async function createAccountSubmit() {
    try {
        const hashedPassword = await SHA256_hash(passC.value)

        const response = await fetch(location.protocol + '//' + location.host + "/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameC.value,
                username: userC.value,
                password: hashedPassword,
            })
        })
        console.log(response.status)
        switch(response.status)
        {
            case 200:
                createAccountHide()
                alert("Account successfully created, please login")
                break
            case 409:
                alert("Username already exists")
                break
            default:
            case 500:
                alert("Database connection error")
                break
        }
    } 
    catch (error) {
        console.error('Unidentified error during account creation: ' + error)
    }
}

async function loginAuth()
{
    try {
        const hashedPassword = await SHA256_hash(document.getElementById('pass').value)

        const response = await fetch(location.protocol + '//' + location.host + "/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('user').value,
                password: hashedPassword,
            }),
        })

        if (response.ok) 
            window.location.href = '/'
        else 
        {    
            const errorData = await response.json()
            console.log(response.status)
            alert("Incorrect Username or Password")
        }
    } 
    catch(error) {
        console.error('Error during login')
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    loadDarkMode()
});

function loadDarkMode() {
    const darkmodeState = localStorage.getItem('darkmode');

    if (darkmodeState !== null) {
        darkModeCheckBox = JSON.parse(darkmodeState)
    } else {
        darkModeCheckBox = true
    }
    updateDarkmode()
}
function updateDarkmode() {
    
    const root = document.documentElement
    localStorage.setItem('darkmode', darkModeCheckBox);
    if (darkModeCheckBox) { /*dark mode*/
      root.style.setProperty("--universalBackground", "#2d2b2b")
      root.style.setProperty("--universalText", "#fff")
      root.style.setProperty("--universalBlue", "#143d8f")
      root.style.setProperty("--universalBorder", "#c4b9b9")
      root.style.setProperty("--universalDeleteBorder", "#c55d5d")
      root.style.setProperty("--universalUnderline", "#fff")
      
    } else { /*light mode*/
      root.style.setProperty("--universalBackground", " #fafafa")
      root.style.setProperty("--universalText", "#000")
      root.style.setProperty("--universalBlue", "#2960ce")
      root.style.setProperty("--universalBorder", "#2d2b2b")
      root.style.setProperty("--universalDeleteBorder", "#5a0000")
      root.style.setProperty("--universalUnderline", "#666666")
  }
}

// let isDragging = false
// let initialX = 0
// let initialY = 0
// let draggedElement = null

// const draggingElements = document.querySelectorAll('.draggable') // Assuming you have elements with the 'draggable' class

// draggingElements.forEach(element => {
//     element.addEventListener('mousedown', e => {
//         isDragging = true
//         draggedElement = element

//         const rect = draggedElement.getBoundingClientRect()
//         initialX = e.clientX + window.scrollX - rect.left
//         initialY = e.clientY + window.scrollY - rect.top
//     })
// })

// document.addEventListener('mousemove', e => {
//     if (isDragging) {
//         e.preventDefault()
//         if (draggedElement) {
//             var offsetX = e.clientX + window.scrollX - initialX
//             var offsetY = e.clientY + window.scrollY - initialY
//             if (offsetX < 0) {
//                 offsetX = 0
//             }
//             if (offsetY < 0) {
//                 offsetX = 0
//             }

//             const containerClientWidth = document.documentElement.clientWidth - document.getElementById("addContainer").clientWidth
//             if (offsetX > containerClientWidth)
//                 offsetX += containerClientWidth + "px"

//             const containerClientHeight = document.documentElement.clientHeight - document.getElementById("addContainer").clientHeight + 500
//             if (offsetY > containerClientHeight)
//                 offsetY += containerClientHeight + 500 + "px"

//             draggedElement.style.left = offsetX + 'px'
//             draggedElement.style.top = offsetY + 'px'
//         }
//     }
// })

// document.addEventListener('mouseup', () => {
//     isDragging = false
//     draggedElement = null
// })
