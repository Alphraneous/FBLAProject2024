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

//Global variables
var accName = ""
var companyElements = []
var companiesList = []
var currentIndex = -1;
var editIndex = -1;


const wrapper = document.getElementById("wrapper")

var dropdown = document.getElementById('dropdown')
var inputElement = document.getElementById('textSearch')


const buttonContainer = document.getElementById("buttonBox")
const addButton = document.getElementById('addButton')
const editButton = document.getElementById('editButton')
const importButton = document.getElementById('importButton')
const logoutButton = document.getElementById('logoutButton')
const fileInput = document.getElementById('fileInput')
const exportButton = document.getElementById('exportButton')
const removeButton = document.getElementById('removeButton')
const accSubmitButton = document.getElementById("accSubmitButton")
const accCancelButton = document.getElementById("accCancelButton")
const accDeleteButton = document.getElementById("accDeleteButton")
const darkModeCheckBox = document.getElementById("darkmodeToggleCheckbox")

var newCompanyInput = new Company(
    document.getElementById('newCompanyName'),
    document.getElementById('newCompanyServices'),
    document.getElementById('newCompanyDesc'),
    document.getElementById('newCompanyAddr'),
    document.getElementById('newCompanyFoundingYear'),
    document.getElementById('newCompanyWebsite'),
    {
        name: document.getElementById('newCompanyContactName'),
        number: document.getElementById('newCompanyContactPhone'),
        email: document.getElementById('newCompanyContactEmail'),
    }
)

const submitButton = document.getElementById('addSubmitButton')
const cancelButton = document.getElementById('addCancelButton')
const aiButton = document.getElementById('addAIfill')

//companiesList = await retrieveData();
    
// Now you can use the companiesList variable in the rest of your code
//console.log(companiesList);

// if (getCompaniesList()) {
//     companiesList = getCompaniesList();
//     console.log("existing user data found, loading")
// }
//console.log(companiesList[0].contact.name);
document.addEventListener('DOMContentLoaded', async function () {
    loadDarkMode()
    let retrievedData = await retrieveData();
    accName = retrievedData.name
    companiesList = retrievedData.companyList
    refreshList(false)
    //console.log(companiesList);

    // Continue with the rest of your code...
});

//will create the buttons and or replace them
function refreshList(deletion) {
    
    var list = companiesList
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
        companyElements[i].button.style.width = currentIndex == -1 ? "96%" : "71%"
        companyElements[i].button.setAttribute("id", "button" + i)
        companyElements[i].button.classList.add("company_button")

        //Create and set attributes of name label
        companyElements[i].nameLabel.classList.add("company_name_button")
        companyElements[i].nameLabel.innerHTML = list[i].name !== undefined ? '<b>' + list[i].name + '</b>' : "<b>No company name</b>"

        //Create and set attributes of resourcesLabel 
        companyElements[i].resourcesLabel.classList.add("company_resources_button")
        companyElements[i].resourcesLabel.innerHTML = list[i].services !== undefined ? list[i].services.join(", ") : "No services provided"

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
        companyElements[l].button.style.width = currentIndex == -1 ? "96%" : "71%"
        if (simpleSearch(companiesList[l][searchParam].toString(), textInput.toString())) {
            companyElements[l].button.style.position = "relative"
            companyElements[l].button.style.zIndex = 2;
            
            trueTimes++
        } else {
            companyElements[l].button.style.position = "absolute"
            companyElements[l].button.style.zIndex = -1;
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
function companyInfoClicked(company, index) {
    if (currentIndex == -1) {
        for (let i = 0; i < companyElements.length; i++) {
            companyElements[i].button.classList.remove("wide")
            addWidthClass(companyElements[i].button, "thin")
        }
    }
    currentIndex = index;


    //panel
    containerPower = document.getElementById("infoId")

    //button creaton

    //main title (company name)
    titleHeader = document.getElementById("titleHeader")
    titleHeader.innerHTML = company.name !== undefined ? company.name : "No company name given"

    //mini infotitle (date created and location)
    yearTitle = document.getElementById("yearTitle")
    yearTitle.innerHTML = company.yearFounded !== undefined ? "est " + company.yearFounded : "No founding year given"

    //address title
    addrTitle = document.getElementById("addrTitle")
    addrTitle.innerHTML = company.address !== undefined ? company.address : "No address given"

    //Company description
    descTitle = document.getElementById("descTitle")
    if (company.description !== undefined)  {
        descTitle.innerHTML = company.description
    }
    else {
        descTitle.innerHTML = "No description given"
    }

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

    //map
    initMap(company);

    //contact name title
    contactNameTitle = document.getElementById("contactNameTitle")
    contactNameTitle.innerHTML = company.contact.name !== undefined ? "Name: " + company.contact.name : "No contact name given"

    //contact phone title
    contactPhoneTitle = document.getElementById("contactPhoneTitle")
    contactPhoneTitle.innerHTML = company.contact.number !== undefined ? "Phone: " + company.contact.number : "No contact number given"

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

    if(wrapper.scrollTop > 120) {
        containerPower.style.top = wrapper.scrollTop + "px"
    } else {
        containerPower.top = "120px";
    }

    containerPower.style.right = 0;
}

function removeListItem(index) {
    console.log("removeListItemCalled")
    companiesList.splice(index, 1)
    containerPower.style.right = "-25%";
    refreshList(true);
    for (let i = 0; i < companyElements.length; i++) {
        companyElements[i].button.classList.remove("thin")
        addWidthClass(companyElements[i].button, "wide")
    }
    currentIndex = -1;
}


//creates button events
function buttonEvents() {
    for (let i = 0; i < companiesList.length; i++) {
        companyElements[i].button.addEventListener('click', () => {
            if(i != currentIndex) {
            companyInfoClicked(companiesList[i], i)
            } else {
                for (let i = 0; i < companyElements.length; i++) {
                    companyElements[i].button.classList.remove("thin")
                    addWidthClass(companyElements[i].button, "wide")
                }
                containerPower.style.right = "-25%";
                currentIndex = -1;
            }
        })
    }

    const exitButton = document.getElementById("exitButton")
    exitButton.addEventListener('click', () => {
        for (let i = 0; i < companyElements.length; i++) {
            companyElements[i].button.classList.remove("thin")
            addWidthClass(companyElements[i].button, "wide")
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
    document.getElementById("addTitle").innerHTML = "<b>Add New Company</b>"
    submitButton.innerHTML = "<b>Submit</b>"
    document.getElementById("addContainer").classList.remove("disappear")
    document.getElementById("addContainer").classList.add("appear")
})

editButton.addEventListener('click', () => {
    editIndex = currentIndex;
    let currentCompany = companiesList[editIndex]
    submitButton.innerHTML = "<b>Save</b>"
    newCompanyInput.name.value           = currentCompany.name
    newCompanyInput.services.value       = currentCompany.services.join(",")
    newCompanyInput.description.value    = currentCompany.description
    newCompanyInput.address.value        = currentCompany.address
    newCompanyInput.yearFounded.value    = currentCompany.yearFounded
    newCompanyInput.websiteURL.value     = currentCompany.websiteURL
    newCompanyInput.contact.name.value   = currentCompany.contact.name
    newCompanyInput.contact.number.value = currentCompany.contact.number
    newCompanyInput.contact.email.value  = currentCompany.contact.email
    document.getElementById("addTitle").innerHTML = "<b>Editing "+ companiesList[editIndex].name + " </b>"
    document.getElementById("addContainer").classList.remove("disappear")
    document.getElementById("addContainer").classList.add("appear")
})



fileInput.addEventListener('change', async () => {
    try {
        companiesList = await importFromJson(fileInput)
        storeCompaniesList();
        refreshList(false)
        for (let i = 0; i < companyElements.length; i++) {
            companyElements[i].button.classList.remove("thin")
            addWidthClass(companyElements[i].button, "wide")
        }
        containerPower.style.right = "-25%";
        currentIndex = -1;
    } catch (error) {
        console.error('Error reading the JSON file:', error);
    }
});

exportButton.addEventListener('click', () => {
    exportToJson(companiesList, 'companiesList.json');

})

function openAccSettings() {
    document.getElementById("accContainer").classList.remove("disappear")
    document.getElementById("accContainer").classList.add("appear")
    document.getElementById("accName").value = accName
}

function accCancel() {
    document.getElementById("accContainer").classList.remove("appear")
    document.getElementById("accContainer").classList.add("disappear")
}

logoutButton.addEventListener('click', () => {
    logout()
})



async function logout()
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) 
            window.location.href = "/login/";
        else 
        {    
            console.error("logout failed")
        }
    } 
    catch {
        console.error('Error during logout')
    }
}

removeButton.addEventListener('click', () => {
    removeListItem(currentIndex);
    storeCompaniesList();
})

const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return email.trim() === "" || emailRegex.test(email)   // Email is not a required field
}

const isValidYearFounded = year => {
    const yearRegex = /^(?!0{4})\d{4}$/;
    return year.trim() === "" || yearRegex.test(year)   // Year is not a required field
}

const isValidPhoneNumber = number => {
    const phoneRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
    return phoneRegex.test(number)  // Blank number already accounted for
}

const isValidURL = url => {
    const urlRegex = /^(?:(?:https?):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/
    return url.trim() === "" || urlRegex.test(url)   // Site URL is not a required field
}

submitButton.addEventListener("click", () => {
    if (newCompanyInput.name.value.toString().trim()           == "" ||
        newCompanyInput.services.value.toString().trim()       == "" ||
        newCompanyInput.contact.name.value.toString().trim()   == "" ||
        newCompanyInput.contact.number.value.toString().trim() == "")
    {
        alert("Please fill all required fields!")
        return
    }

    if(!isValidEmail(newCompanyInput.contact.email.value.toString()) || 
       !isValidPhoneNumber(newCompanyInput.contact.number.value.toString()) || 
       !isValidYearFounded(newCompanyInput.yearFounded.value.toString()) ||
       !isValidURL(newCompanyInput.websiteURL.value.toString()))
    {
        alert("Invalid data entered")
        return
    }

    addListItem(new Company(
        newCompanyInput.name.value.toString().trim(),
        newCompanyInput.services.value.toString().split(',').map(service => service.trim()),
        newCompanyInput.description.value.toString().trim(),
        newCompanyInput.address.value.toString().trim(),
        newCompanyInput.yearFounded.value.toString().trim(),
        newCompanyInput.websiteURL.value.toString().trim(),
        {
            name: newCompanyInput.contact.name.value.toString().trim(),
            number: newCompanyInput.contact.number.value.toString().trim(),
            email: (email => email === ""? "No email given": email)(newCompanyInput.contact.email.value.toString().trim())
        }
    ))
    storeCompaniesList()
})

//AI Autofill Stuff
aiButton.onclick=async() => {
    let companyName = newCompanyInput.name.value
    if(companyName.trim().length < 3) {
        alert("Please enter a company name with 3 or more letters to use AI Autofill")
    } else {
        document.getElementById("addContainerInner").style = "filter:grayscale(); pointer-events: none; opacity: 0.5;";
        document.getElementById("loader").style.display = "block";

        const response = await promptAI("Find the following pieces of data for the company/organization named " + companyName + ": Services Provided, Short Description, Address, Year Founded, Website, Contact Name, Contact Phone Number, and Contact Email of a contact at the company/organization (this could be the owner, a sales rep, etc). Replace any unknown fields with 'N/A' and keep your data concise");
        
        document.getElementById("addContainerInner").style = "";
        document.getElementById("loader").style.display = "none"
        //console.log(response.substring(response.indexOf('{'), response.lastIndexOf('}')+1))
        //alert(response.substring(response.indexOf('{'), response.lastIndexOf('}')+1))
        
        let parsedResponse  = JSON.parse(response.substring(response.indexOf('{'), response.lastIndexOf('}')+1))
        newCompanyInput.services.value       = parsedResponse.services.join(",")
        newCompanyInput.description.value    = parsedResponse.description
        newCompanyInput.yearFounded.value    = parsedResponse.yearFounded == "N/A" ? "" : parsedResponse.yearFounded 
        newCompanyInput.address.value        = parsedResponse.address
        newCompanyInput.websiteURL.value     = parsedResponse.websiteURL
        newCompanyInput.contact.name.value   = parsedResponse.contact.name
        newCompanyInput.contact.number.value = parsedResponse.contact.number == "N/A" ? "555-555-5555" : parsedResponse.contact.number
        newCompanyInput.contact.email.value  = parsedResponse.contact.email == "N/A" ? "example@example.com" : parsedResponse.contact.email
    }
    
}

accSubmitButton.onclick=async() => {
    if(document.getElementById("accName").value.trim() != accName) {
        let newInitialName = document.getElementById("accName").value.trim()
        let nameSetResult = await setName()
        if(!nameSetResult) {
            alert("Unidentified error setting name")
            return
        } else {
            accName = newInitialName
        }
    }
    if(document.getElementById("accNewPassword").value.trim() != "") {
        if(document.getElementById("accNewPassword").value.trim() != document.getElementById("accNewPasswordC").value.trim()) {
            alert("New passwords must match!")
            return
        } else {
            let passwordSetResult = await setPwd() 
            switch(passwordSetResult) {
                case 200:
                    alert("Changes saved successfully")
                    document.getElementById("accContainer").classList.remove("appear")
                    document.getElementById("accContainer").classList.add("disappear")
                    document.getElementById("accNewPassword").value = ""
                    document.getElementById("accNewPasswordC").value = ""
                    return
                case 401:
                    alert("Old password is incorrect")
                    return
                case 500:
                    alert("Internal server error")
                    return
                default:
                    alert("Unidentified error")
                    return
            }
        }
    }
    alert("Changes saved successfully")
    document.getElementById("accContainer").classList.remove("appear")
    document.getElementById("accContainer").classList.add("disappear")
    document.getElementById("accNewPassword").value = ""
    document.getElementById("accNewPasswordC").value = ""
};

accDeleteButton.onclick=async() => {
    let oldPwd = prompt("Enter your password to confirm deletion")
    if(oldPwd.trim == "" || !oldPwd) {
        alert("Incorrect password")
        return
    }
    let accDeleteResult = await accDelete(oldPwd)
    switch(accDeleteResult) {
        case 200:
            alert("Account deleted successfully")
            location.href = "/login/"
            return
        case 401:
            alert("Incorrect password")
            return
        case 500:
            alert("Internal server error")
            return
        default:
            alert("Unidentified error")
            return
    }

};

function addListItem(newCompany) {
    if(editIndex != -1) { 
        companiesList[editIndex] = newCompany
    } else {
        companiesList.push(newCompany)
    }

    refreshList(false)

    if(editIndex != -1) { 
        companyInfoClicked(newCompany, editIndex)
    } else {
        companyInfoClicked(newCompany, companiesList.length - 1)
    }

    editIndex = -1
    
    document.getElementById("addContainer").classList.remove("appear")
    document.getElementById("addContainer").classList.add("disappear")

    newCompanyInput.name.value           = ""
    newCompanyInput.services.value       = ""
    newCompanyInput.description.value    = ""
    newCompanyInput.address.value        = ""
    newCompanyInput.yearFounded.value    = ""
    newCompanyInput.websiteURL.value     = ""
    newCompanyInput.contact.name.value   = ""
    newCompanyInput.contact.number.value = ""
    newCompanyInput.contact.email.value  = ""
}

cancelButton.addEventListener('click', () => {
    editIndex = -1;
    document.getElementById("addContainer").classList.remove("appear")
    document.getElementById("addContainer").classList.add("disappear")
    
    newCompanyInput.name.value           = ""
    newCompanyInput.services.value       = ""
    newCompanyInput.description.value    = ""
    newCompanyInput.address.value        = ""
    newCompanyInput.yearFounded.value    = ""
    newCompanyInput.websiteURL.value     = ""
    newCompanyInput.contact.name.value   = ""
    newCompanyInput.contact.number.value = ""
    newCompanyInput.contact.email.value  = ""
})

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

//Funny CSS stuff ignore pls
document.querySelector('.add_button').addEventListener('mouseover', function () {
    // addButton.innerHTML = `<div style="display: flex; flex-direction: row; justify-content: center; padding-top: 2%; align-items: center;">
    // <b>Add Company</b>
    // <span class="material-symbols-outlined" id="expand_more">expand_more</span>
    // </div>`
    document.querySelector('.additional_buttons').style.scale = '1';
    document.querySelector('.container').style.height = '170px';
});

document.querySelector('.container').addEventListener('mouseleave', function () {
    // addButton.innerHTML = `<div style="display: flex; flex-direction: row; justify-content: center; padding-top: 2%; align-items: center;">
    // <b>Menu</b>
    // <span class="material-symbols-outlined" id="expand_more">expand_more</span>
    // </div>`
    document.querySelector('.additional_buttons').style.scale = '0';
    document.querySelector('.container').style.height = '';
});

//JSON Stuff
const exportToJson = (data, filename) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const importFromJson = async (fileInput) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };

        reader.readAsText(fileInput.files[0]);
    });
};

//Some more css tomfoolery
document.getElementById('importButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

function addWidthClass(button, className) {
    if(button.classList.contains("scale_out")) {
        button.classList.remove("scale_out")
        button.classList.add(className)
        button.classList.add("scale_out")
    } 
    else if(button.classList.contains("scale_in")) {
        button.classList.remove("scale_in")
        button.classList.add(className)
        button.classList.add("scale_in")
    } else {
        button.classList.add(className)
    }
}


wrapper.addEventListener('scroll', function () {
    
    const infoBox = document.getElementById("infoId")
    let offsetPx = 0;
    if(infoBox.offsetHeight > wrapper.offsetHeight) {
        offsetPx = infoBox.offsetHeight - wrapper.offsetHeight
    } else {
        offsetPx = 0;
    }
    if(wrapper.scrollTop > 120 + offsetPx) {
        infoBox.style.top = (wrapper.scrollTop - offsetPx) + "px"
    } else {
        infoBox.style.top = 120 + "px";
    }
});


function loadDarkMode() {
    const darkmodeState = localStorage.getItem('darkmode');

    if (darkmodeState !== null) {
        darkModeCheckBox.checked = JSON.parse(darkmodeState)
    } else {
        darkModeCheckBox.checked = false
    }
    updateDarkmode()
}
function updateDarkmode() {
    
    const root = document.documentElement
    localStorage.setItem('darkmode', darkModeCheckBox.checked);
    if (darkModeCheckBox.checked) { /*dark mode*/
      root.style.setProperty("--universalBackground", "#2d2b2b")
      root.style.setProperty("--universalText", "#fff")
      root.style.setProperty("--universalBlue", "#143d8f")
      root.style.setProperty("--universalBorder", "#dfd8d8")
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
  
//Data persistence stuff
function storeCompaniesList() {
    //localStorage.setItem('companiesList', JSON.stringify(companiesList));
    storeList()
}

function getCompaniesList() {
    const storedCompaniesList = localStorage.getItem('companiesList');
    return storedCompaniesList ? JSON.parse(storedCompaniesList) : false;
}

//Map stuff
var map;

async function initMap(company) {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const geocoder = new google.maps.Geocoder();
  
  geocoder.geocode({ address: company.address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        const position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
        };

        map = new Map(document.getElementById("map"), {
            zoom: 15, // Adjust the zoom level as needed
            center: position,
            mapId: "DEMO_MAP_ID",
            disableDefaultUI: true,
        });

        // The marker, positioned at the company's address
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: company.name,
        });
    } else {
        console.error("Geocoding failed:", status);
    }
  });
}

async function retrieveData()
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/getCList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.status == 200) 
        {   
            const resultsJson = await response.json()
            return resultsJson
        }
        else 
        {    
            const errorData = await response.json()
            return false
        }
    } 
    catch(error) {
        console.error('Error during login')
        return false

    }
}

async function storeList()
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/setCList", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companiesList)
        })

        return response.status == 200
    } 
    catch(error) {
        console.error('Error during list store')
        console.error(error)
        return false

    }
}

async function setName()
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/setName", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newName: document.getElementById("accName").value.trim()
            })
        })

        return response.status == 200
    } 
    catch(error) {
        console.error('Error during nameSetting')
        return false

    }
}

async function SHA256_hash(str)
{
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArr = Array.from(new Uint8Array(hashBuffer))
    return hashArr.map(byte => byte.toString(16).padStart(2, '0')).join('')   
}

async function setPwd()
{
    try {
        const hashedPassword = await SHA256_hash(document.getElementById("accOldPassword").value.trim())
        const hashedNewPassword = await SHA256_hash(document.getElementById("accNewPassword").value.trim())

        const response = await fetch(location.protocol + '//' + location.host + "/setPwd", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: hashedPassword,
                newPassword: hashedNewPassword
            })
        })

        return response.status
    } 
    catch(error) {
        console.error('Error during pwdSetting')
        return 418

    }
}

async function accDelete(oldPwd)
{
    try {
        const hashedOldPassword = await SHA256_hash(oldPwd)

        const response = await fetch(location.protocol + '//' + location.host + "/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: hashedOldPassword
            })
        })

        return response.status
    } 
    catch(error) {
        console.error('Error during accDelete')
        return 418
    }
}

async function promptAI(prompt)
{
    try {
        const response = await fetch(location.protocol + '//' + location.host + "/prompt", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt
            })
        })

        if(!response.ok)
            console.error(response.statusText)

        const responseMessage = await response.json()
    
        return responseMessage.choices[0].message.content
    } 
    catch(error) {
        console.error('Error during AI prompt')
        return false
    }
}