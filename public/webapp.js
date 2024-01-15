const quotes = ["In war, there is no prize for the runner-up", "Never fear something simply because others do"]

document.getElementById('easterEgg').innerHTML = quotes[Math.floor(Math.random() * quotes.length)]

function toLogin()
{
    window.location.href = '/login/'
}

async function loginAuth()
{
    const user = document.getElementById('user').value
    const pass = document.getElementById('pass').value

    try {
        const response = await fetch(location.protocol + '//' + location.host + "/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: pass,
            }),
        })

        if (response.ok) 
            window.location.href = "/";
        else 
        {    
            const errorData = await response.json()
            alert("Incorrect Username or Password")
        }
    } 
    catch {
        console.error('Error during login')
    }
}


let isDragging = false
let initialX = 0
let initialY = 0
let draggedElement = null

const draggingElements = document.querySelectorAll('.draggable') // Assuming you have elements with the 'draggable' class

draggingElements.forEach(element => {
    element.addEventListener('mousedown', e => {
        isDragging = true
        draggedElement = element

        const rect = draggedElement.getBoundingClientRect()
        initialX = e.clientX + window.scrollX - rect.left
        initialY = e.clientY + window.scrollY - rect.top
    })
})

document.addEventListener('mousemove', e => {
    if (isDragging) {
        e.preventDefault()
        if (draggedElement) {
            var offsetX = e.clientX + window.scrollX - initialX
            var offsetY = e.clientY + window.scrollY - initialY
            if (offsetX < 0) {
                offsetX = 0
            }
            if (offsetY < 0) {
                offsetX = 0
            }

            const containerClientWidth = document.documentElement.clientWidth - document.getElementById("addContainer").clientWidth
            if (offsetX > containerClientWidth)
                offsetX += containerClientWidth + "px"

            const containerClientHeight = document.documentElement.clientHeight - document.getElementById("addContainer").clientHeight + 500
            if (offsetY > containerClientHeight)
                offsetY += containerClientHeight + 500 + "px"

            draggedElement.style.left = offsetX + 'px'
            draggedElement.style.top = offsetY + 'px'
        }
    }
})

document.addEventListener('mouseup', () => {
    isDragging = false
    draggedElement = null
})
