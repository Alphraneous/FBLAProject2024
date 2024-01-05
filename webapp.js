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
    new Company(
        "Wagner Machine Co",
        ["Machining"],
        "Offers machining services.",
        "1804 N Market St, Champaign, IL 61822",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "General Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "general_manager@wagnermachineco.com"
        }
    ),
    
    new Company(
        "Carle Foundation Hospital",
        ["Healthcare"],
        "Provides healthcare services.",
        "611 W Park St, Urbana, IL 61801",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Hospital Administrator",
            number: "+1-XXX-XXX-XXXX",
            email: "admin@carlehospital.org"
        }
    ),
    
    new Company(
        "A&R Mechanical Contractors",
        ["HVAC"],
        "Offers heating, ventilation, and air conditioning services.",
        "1006 N Country Fair Dr, Champaign, IL 61821",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "HVAC Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "hvac_manager@arcontractors.com"
        }
    ),
    
    new Company(
        "Checkered Records",
        ["Vinyl Record Store"],
        "Provides vinyl record store services.",
        "1702 W. State St., Urbana, IL 61801",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Record Store Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@checkeredrecords.com"
        }
    ),
    
    new Company(
        "The Blind Man Company",
        ["Window Treatment"],
        "Offers window treatment services.",
        "909 Pioneer St, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Window Treatment Specialist",
            number: "+1-XXX-XXX-XXXX",
            email: "specialist@blindmancompany.com"
        }
    ),
    
    new Company(
        "Illini Recycling",
        ["Recycling"],
        "Provides recycling services.",
        "2611 S Staley Rd, Champaign, IL 61822",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Recycling Coordinator",
            number: "+1-XXX-XXX-XXXX",
            email: "coordinator@illinirecycling.com"
        }
    ),
    
    new Company(
        "Gomez Heating & Air Conditioning",
        ["HVAC"],
        "Offers HVAC services.",
        "2502 N Mattis Ave, Champaign, IL 61822",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "HVAC Specialist",
            number: "+1-XXX-XXX-XXXX",
            email: "specialist@gomezhvac.com"
        }
    ),
    
    new Company(
        "Busey Bank",
        ["Banking", "Financial Services"],
        "Provides banking and financial services.",
        "201 W Main St, Urbana, IL 61801",
        1868,
        "https://www.busey.com",
        {
            name: "Bank Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@buseybank.com"
        }
    ),
    
    new Company(
        "Birkey's Farm Store",
        ["Agricultural Equipment"],
        "Offers agricultural equipment and services.",
        "2202 N High Cross Rd, Urbana, IL 61802",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Farm Equipment Specialist",
            number: "+1-XXX-XXX-XXXX",
            email: "specialist@birkeysfarmstore.com"
        }
    ),
    
    new Company(
        "Furniture Lounge",
        ["Furniture Store"],
        "Provides furniture store services.",
        "6 E University Ave, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Store Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@furniturelounge.com"
        }
    ),

    new Company(
        "Yoder's Amish Furniture",
        ["Furniture Store"],
        "Offers handcrafted Amish furniture.",
        "105 W Main St, Arthur, IL 61911",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Store Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@yodersamishfurniture.com"
        }
    ),
    
    new Company(
        "Green Thumb Garden Center",
        ["Garden Center"],
        "Provides a variety of plants, tools, and gardening services.",
        "1501 S Neil St, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Garden Center Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@greenthumbgardencenter.com"
        }
    ),
    
    new Company(
        "Express Clean Laundromat",
        ["Laundromat", "Dry Cleaning"],
        "Offers laundry and dry cleaning services.",
        "123 E University Ave, Urbana, IL 61801",
        2010,
        "http://expresscleanlaundry.com",
        {
            name: "Laundromat Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@expresscleanlaundromat.com"
        }
    ),
    
    new Company(
        "Tech Solutions IT Services",
        ["IT Services"],
        "Provides comprehensive IT solutions for businesses.",
        "789 Technology Dr, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "IT Services Director",
            number: "+1-XXX-XXX-XXXX",
            email: "director@techsolutionsit.com"
        }
    ),
    
    new Company(
        "Sweet Serenity Bakery",
        ["Bakery"],
        "Specializes in custom cakes, pastries, and desserts.",
        "202 S Broadway Ave, Urbana, IL 61801",
        2015,
        "http://sweetserenitybakery.com",
        {
            name: "Bakery Owner",
            number: "+1-XXX-XXX-XXXX",
            email: "owner@sweetserenitybakery.com"
        }
    ),
    
    new Company(
        "Champaign-Urbana Fitness Center",
        ["Fitness Center", "Personal Training"],
        "Offers fitness classes and personalized training.",
        "500 E Peabody Dr, Champaign, IL 61820",
        2007,
        "http://cufitnesscenter.com",
        {
            name: "Fitness Center Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@cufitnesscenter.com"
        }
    ),
    
    new Company(
        "Paws and Whiskers Pet Grooming",
        ["Pet Grooming"],
        "Provides grooming services for dogs and cats.",
        "777 W Springfield Ave, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Pet Grooming Specialist",
            number: "+1-XXX-XXX-XXXX",
            email: "grooming@pawsandwhiskers.com"
        }
    ),
    
    new Company(
        "Java Junction Coffee House",
        ["Coffee Shop"],
        "Serves a variety of coffee and snacks.",
        "301 E Green St, Champaign, IL 61820",
        2005,
        "http://javajunctioncoffee.com",
        {
            name: "Coffee House Owner",
            number: "+1-XXX-XXX-XXXX",
            email: "owner@javajunctioncoffee.com"
        }
    ),
    
    new Company(
        "Champaign-Urbana Courier Service",
        ["Courier Service"],
        "Offers reliable and timely courier services.",
        "450 N Neil St, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Courier Service Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@cucourierservice.com"
        }
    ),
    
    new Company(
        "The Painted Canvas Art Studio",
        ["Art Studio", "Art Classes"],
        "Provides art classes and studio space for artists.",
        "700 S Gregory St, Urbana, IL 61801",
        2012,
        "http://paintedcanvasartstudio.com",
        {
            name: "Art Studio Director",
            number: "+1-XXX-XXX-XXXX",
            email: "director@paintedcanvasartstudio.com"
        }
    ),
    new Company(
        "Champaign Cleaners",
        ["Dry Cleaning"],
        "Provides dry cleaning and laundry services.",
        "1234 W Springfield Ave, Champaign, IL 61821",
        1995,
        "http://champaigncleaners.com",
        {
            name: "Cleaning Services Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@champaigncleaners.com"
        }
    ),
    
    new Company(
        "TechHub Solutions",
        ["Technology Solutions"],
        "Offers innovative technology solutions for businesses.",
        "567 Technology Pkwy, Urbana, IL 61802",
        2002,
        "http://techhubsolutions.com",
        {
            name: "Tech Solutions CEO",
            number: "+1-XXX-XXX-XXXX",
            email: "ceo@techhubsolutions.com"
        }
    ),
    
    new Company(
        "Green Valley Florist",
        ["Florist"],
        "Provides a wide range of floral arrangements and gifts.",
        "789 Garden Way, Champaign, IL 61820",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Florist Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@greenvalleyflorist.com"
        }
    ),
    
    new Company(
        "Epic Fitness Studio",
        ["Fitness Studio", "Yoga Classes"],
        "Offers fitness and yoga classes for all levels.",
        "876 Wellness Blvd, Urbana, IL 61801",
        2014,
        "http://epicfitnessstudio.com",
        {
            name: "Fitness Studio Owner",
            number: "+1-XXX-XXX-XXXX",
            email: "owner@epicfitnessstudio.com"
        }
    ),
    
    new Company(
        "Pet Haven Veterinary Clinic",
        ["Veterinary Services"],
        "Provides comprehensive veterinary care for pets.",
        "432 Animal Ave, Champaign, IL 61822",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Veterinary Clinic Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@pethavenvetclinic.com"
        }
    ),
    
    new Company(
        "Bookworm Bookstore",
        ["Bookstore"],
        "Sells a variety of books, including new and used titles.",
        "321 Reading St, Urbana, IL 61801",
        1990,
        "http://bookwormbookstore.com",
        {
            name: "Bookstore Owner",
            number: "+1-XXX-XXX-XXXX",
            email: "owner@bookwormbookstore.com"
        }
    ),
    
    new Company(
        "Golden Spoon Catering",
        ["Catering"],
        "Provides catering services for events and special occasions.",
        "555 Celebration Blvd, Champaign, IL 61820",
        2008,
        "http://goldenspooncatering.com",
        {
            name: "Catering Manager",
            number: "+1-XXX-XXX-XXXX",
            email: "manager@goldenspooncatering.com"
        }
    ),
    
    new Company(
        "Artisanal Craft Brewery",
        ["Brewery"],
        "Crafts a variety of unique and flavorful beers.",
        "789 Craftsmanship Ln, Urbana, IL 61802",
        2016,
        "http://artisanalbrewery.com",
        {
            name: "Brewery Owner",
            number: "+1-XXX-XXX-XXXX",
            email: "owner@artisanalbrewery.com"
        }
    ),
    
    new Company(
        "Elite Security Services",
        ["Security Services"],
        "Provides professional security services for businesses.",
        "987 Security Way, Champaign, IL 61821",
        "No Founding Year Given",
        "No Website Available",
        {
            name: "Security Services Director",
            number: "+1-XXX-XXX-XXXX",
            email: "director@elitesecurityservices.com"
        }
    ),
    
    new Company(
        "Sculpted Edge Hair Salon",
        ["Hair Salon"],
        "Offers hairstyling, coloring, and beauty services.",
        "456 Style St, Champaign, IL 61820",
        2004,
        "http://sculptededgehairsalon.com",
        {
            name: "Salon Owner",
            number: "+1-XXX-XXX-XXXX",
            email: "owner@sculptededgehairsalon.com"
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
