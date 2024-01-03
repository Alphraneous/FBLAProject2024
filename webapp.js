class Company {
    constructor(name, services, desc, address, yearFounded, websiteURL, contactInfo) {
        this.name = name;
        this.services = services;
        this.description = desc;
        this.address = address;
        this.yearFounded = yearFounded;
        this.websiteURL = websiteURL;
        this.contact = contactInfo;
    }
}

class CompanyElement {
    constructor(button, nameLabel, resourcesLabel) {
        this.button = button
        this.nameLabel = nameLabel
        this.resourcesLabel = resourcesLabel
    }
}

var companyElements = []
var companiesList   = []
var currentIndex    = -1;

var oldListLength   = null
var infoPage        = null
var exitButton      = null
var titleHeader     = null
var miniTitle       = null
var resourcesText   = null
var companyLink     = null
var companyLinkWrap = null
var dropdown        = document.getElementById('dropdown')
var inputElement    = document.getElementById('textSearch')


const buttonContainer = document.getElementById("buttonBox")
const addButton       = document.getElementById('addButton')
const removeButton    = document.getElementById('removeButton')

const newCompanyNameInput         = document.getElementById('newCompanyName')
const newCompanyServicesInput     = document.getElementById('newCompanyServices')
const newCompanyDescInput         = document.getElementById('newCompanyDesc')
const newCompanyAddrInput         = document.getElementById('newCompanyAddr')
const newCompanyFoundingYearInput = document.getElementById('newCompanyFoundingYear')
const newCompanyWebsiteInput      = document.getElementById('newCompanyWebsite')
const newCompanyContactNameInput  = document.getElementById('newCompanyContactName')
const newCompanyContactPhoneInput = document.getElementById('newCompanyContactPhone')
const newCompanyContactEmailInput = document.getElementById('newCompanyContactEmail')
const submitButton                = document.getElementById('addSubmitButton')
const cancelButton                = document.getElementById('addCancelButton')

var exampleCompanies = [
    new Company("MAN Floorings, Inc.",
        ["Floorings", "Tile Repair"],
        "We provide floors.",
        "1684 East St",
        2009,
        "http://manfloorings.com",
        {
            name: "John Hawthorne",
            number: "+1-218-777-8888",
            email: "j_hawthorne@gmail.com"
        }
    ),
    new Company(
        "XYZ Consulting",
        ["Consulting", "Business Services"],
        "Your strategic partner for business success.",
        "123 Main Street, Suite 456",
        2012,
        "http://xyzconsulting.com",
        {
            name: "Jane Doe",
            number: "+1-555-123-4567",
            email: "jane.doe@xyzconsulting.com"
        }
    ),
    new Company(
        "GreenGrove Landscapes",
        ["Landscaping", "Gardening"],
        "Creating beautiful outdoor spaces for your home.",
        "789 Green Avenue",
        2014,
        "http://greengrovelandscapes.com",
        {
            name: "Robert Green",
            number: "+1-987-654-3210",
            email: "robert@greengrovelandscapes.com"
        }
    ),
    new Company(
        "TechSprint Innovations",
        ["Technology", "Software Development"],
        "Innovating the future with cutting-edge technology.",
        "567 Tech Plaza",
        2018,
        "http://techsprintinnovations.com",
        {
            name: "Alex Turner",
            number: "+1-777-888-9999",
            email: "alex@techsprintinnovations.com"
        }
    ),
    new Company(
        "GreenHarbor Sustainable Solutions",
        ["Environmental", "Green Energy"],
        "Promoting sus for a greener tomorrow.",
        "101 Harbor Way",
        2015,
        "http://greenharborsolutions.com",
        {
            name: "Emily Green",
            number: "+1-333-444-5555",
            email: "emily@greenharborsolutions.com"
        }
    )

]

companiesList = exampleCompanies

//console.log(companiesList[0].contact.name);
refreshList(false)

//will create the buttons and or replace them
function refreshList(deletion) 
{
    var list = companiesList
    console.log(companiesList.length)
    if (document.getElementById("button0") !== null) {
        //Remove all previous buttons
        Array.from(document.getElementById("buttonBox").querySelectorAll('[id^="button"]')).forEach(element => element.remove());
    }

    companyElements = []

    for (let i = 0; i < list.length; i++) {

        companyElements[i] = new CompanyElement(
            document.createElement("button"), 
            document.createElement("p"),
            document.createElement("p")
        )

        //Create and set attributes of button
        companyElements[i].button.style.width = currentIndex == -1? "90%": "65%"
        companyElements[i].button.setAttribute("id", "button" + i)
        companyElements[i].button.classList.add("company_button")
        companyElements[i].button.style.top = 120 + 65 * i + "px"
    
        //Create and set attributes of name label
        companyElements[i].nameLabel.classList.add("company_name_button")
        companyElements[i].nameLabel.innerHTML = list[i].name !== undefined? '<b>' + list[i].name + '</b>': "<b>No company name</b>"

        //Create and set attributes of resourcesLabel 
        companyElements[i].resourcesLabel.classList.add("company_resources_button")
        companyElements[i].resourcesLabel.innerHTML = list[i].services !== undefined? list[i].services.join(", "): "No services provided"

        //Add button to the buttonContainer
        buttonContainer.appendChild(companyElements[i].button)

        //Add labels to button
        companyElements[i].button.appendChild(companyElements[i].nameLabel)
        companyElements[i].button.appendChild(companyElements[i].resourcesLabel)
    }
    buttonContainer.style.height = 15 + (list.length * 65) + "px"
    buttonEvents(companiesList)
}
//called as soon as the text input or drop down change
function listSearch(textInput, searchParam) {
    let trueTimes = 0;
    for (var l = 0; l < companiesList.length; l++) {
        companyElements[l].button.style.width = ""; 
        if (simpleSearch(companiesList[l][searchParam].toString(), textInput.toString())) {
            companyElements[l].button.style.top = 120 + 65 * trueTimes + "px"
            companyElements[l].button.style.scale = "1"
            trueTimes++
        } else {
            companyElements[l].button.style.scale = "0"
        }
    }

}
//search algorithm 
function simpleSearch(text, input) {
    text = text.toLowerCase()
    input = input.toLowerCase()

    return text.includes(input)
}


//this creates the info panel when a buttons on a row are made
function buttonClicked(company, index) {
    if (currentIndex == -1) { 
        for (let i = 0; i < companyElements.length; i++) {
            companyElements[i].button.classList.remove("wide")
            companyElements[i].button.classList.add("thin")
        }
    }
    currentIndex = index;
    console.log("buttonClicked executed")
    

    //panel
    containerPower = document.getElementById("infoId")

    //button creaton

    //main title (company name)
    titleHeader = document.getElementById("titleHeader")
    titleHeader.innerHTML = company.name !== undefined? company.name: "No company name given"

    //mini infotitle (date created and location)
    yearTitle = document.getElementById("yearTitle")
    yearTitle.innerHTML = company.yearFounded !== undefined? "est " + company.yearFounded: "No founding year given"

    //address title
    addrTitle = document.getElementById("addrTitle")
    addrTitle.innerHTML = company.address !== undefined? company.address: "No address given"

    //Company resources
    resourcesText = document.getElementById("servicesTitle")
    if (company.services !== undefined) {
        var resourcesTextWrite = ""
        for (v = 0; v < company.services.length; v++) {
            resourcesTextWrite += company.services[v] + "<br>"
        }
        resourcesText.innerHTML = resourcesTextWrite
    } 
    else 
        resourcesText.innerHTML = "No resources given"

    //website(hyperlink)
    companyLinkWrap = document.getElementById("companyLinkWrap")

    companyLink = document.getElementById("companyLink")

    if (company.websiteURL !== undefined) {
        companyLink.innerHTML = company.websiteURL
        companyLink.setAttribute("href", company.websiteURL)

    } 
    else {
        companyLink.innerHTML = "No website given"
        companyLink.style.color = "blue"
    }

    //contact name title
    contactNameTitle = document.getElementById("contactNameTitle")
    contactNameTitle.innerHTML = company.contact.name !== undefined? "Name: " + company.contact.name: "No contact name given"

    //contact phone title
    contactPhoneTitle = document.getElementById("contactPhoneTitle")
    contactPhoneTitle.innerHTML = company.contact.number !== undefined? "Phone: " + company.contact.number: "No contact number given"

    contactEmailTitle = document.getElementById("contactEmailTitle")
    if (company.contact.email == undefined || company.contact.email == "")
        contactEmailTitle.style.visibility = "collapsed"
    else {
        contactEmailTitle.innerHTML = "Email: " + company.contact.email
        contactEmailTitle.style.visibility = "visible"
    }

    let headerHeight = document.querySelector(".top_bar").offsetHeight;
    if (window.scrollY > headerHeight) {
        containerPower.style.position = "fixed"
        containerPower.style.top = "0px"
    } 
    else {
        containerPower.style.position = "absolute"
        containerPower.style.top = ""
    }

    //this is executed after the button has been created
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            containerPower.style.position = "fixed"
            containerPower.style.top = "0px"
        } else {
            containerPower.style.position = "absolute"
            containerPower.style.top = ""
        }
    });

    

    containerPower.style.right = 0;
}

function removeListItem(index) {
    console.log("removeListItemCalled")
    companiesList.splice(index, 1)
    containerPower.style.right = "-25%";
    refreshList(true);  
    for (let i = 0; i < companyElements.length; i++) {
        companyElements[i].button.classList.remove("thin")
        companyElements[i].button.classList.add("wide")
    }
    currentIndex = -1;
}


//creates button events
function buttonEvents() {
    for (let i = 0; i < companiesList.length; i++) {
        companyElements[i].button.addEventListener('click', () => {
            buttonClicked(companiesList[i], i)
        })
    }

    const exitButton = document.getElementById("exitButton")
    exitButton.addEventListener('click', () => {
        for (let i = 0; i < companyElements.length; i++) {
            companyElements[i].button.classList.remove("thin")
            companyElements[i].button.classList.add("wide")
        }
        containerPower.style.right = "-25%";
        currentIndex = -1;
    })
    
}

//buttonEvents
const searchParams = ["name", "services", "address", "yearFounded", "websiteURL"]
dropdown.addEventListener('change', () => {
    let valueInput = searchParams[dropdown.value]
    let textInput = inputElement.value
    listSearch(textInput, valueInput)
})

inputElement.addEventListener('input', () => {
    let valueInput = searchParams[dropdown.value]
    let textInput = inputElement.value
    listSearch(textInput, valueInput)
})

addButton.addEventListener('click', () => {
    document.getElementById("addContainer").classList.remove("disappear")
    document.getElementById("addContainer").classList.add("appear")
})

removeButton.addEventListener('click', () => {
    removeListItem(currentIndex);
})



submitButton.addEventListener("click", function () {
    if (newCompanyNameInput.value.toString().trim()         == "" ||
        newCompanyServicesInput.value.toString().trim()     == "" ||
        newCompanyContactNameInput.value.toString().trim()  == "" ||
        newCompanyContactPhoneInput.value.toString().trim() == "" ||
        newCompanyNameInput.value.toString().trim() == "")
            alert("Please fill all required fields!")
    else {
        let newCompany = new Company(
            newCompanyNameInput.value.toString().trim(),
            newCompanyServicesInput.value.toString().split(',').map(service => service.trim()),
            newCompanyDescInput.value.toString().trim(),
            newCompanyAddrInput.value.toString().trim(),
            newCompanyFoundingYearInput.value.toString().trim(),
            newCompanyWebsiteInput.value.toString().trim(),
            {
                name: newCompanyContactNameInput.value.toString().trim(),
                number: newCompanyContactPhoneInput.value.toString().trim(),
                email: newCompanyContactEmailInput.value.toString().trim()
            }
        );

        addListItem(newCompany)
    }
})

function addListItem(newCompany) {
    companiesList.push(newCompany)
    refreshList(false)
    buttonClicked(newCompany,companiesList.length-1)
    document.getElementById("addContainer").classList.remove("appear")
    document.getElementById("addContainer").classList.add("disappear")
    newCompanyNameInput.value = '';
    newCompanyServicesInput.value = '';
    newCompanyDescInput.value = '';
    newCompanyAddrInput.value = '';
    newCompanyFoundingYearInput.value = '';
    newCompanyWebsiteInput.value = '';
    newCompanyContactNameInput.value = '';
    newCompanyContactPhoneInput.value = '';
    newCompanyContactEmailInput.value = '';

}

cancelButton.addEventListener('click', () => {
    document.getElementById("addContainer").classList.remove("appear")
    document.getElementById("addContainer").classList.add("disappear")
    newCompanyNameInput.value = '';
    newCompanyServicesInput.value = '';
    newCompanyDescInput.value = '';
    newCompanyAddrInput.value = '';
    newCompanyFoundingYearInput.value = '';
    newCompanyWebsiteInput.value = '';
    newCompanyContactNameInput.value = '';
    newCompanyContactPhoneInput.value = '';
    newCompanyContactEmailInput.value = '';
})



let isDragging = false
let initialX = 0
let initialY = 0
let draggedElement = null

const draggingElements = document.querySelectorAll('.draggable') // Assuming you have elements with the 'draggable' class

draggingElements.forEach(function (element) {
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
            if(offsetX < 0) {
                offsetX = 0
            }
            if(offsetY < 0) {
                offsetX = 0
            }

            if(offsetX > document.documentElement.clientWidth - document.getElementById("addContainer").clientWidth) {
                offsetX = document.documentElement.clientWidth - document.getElementById("addContainer").clientWidth + "px"
            }

            if(offsetY > document.documentElement.clientHeight - document.getElementById("addContainer").clientHeight+ 500) {
                offsetY = document.documentElement.clientHeight - document.getElementById("addContainer").clientHeight + 500+ "px"
            }
            draggedElement.style.left = offsetX + 'px'
            draggedElement.style.top = offsetY + 'px'
        }
    }
})

document.addEventListener('mouseup', () => {
    isDragging = false
    draggedElement = null
})
