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
var companiesList = []
var currentIndex = -1;

var dropdown = document.getElementById('dropdown')
var inputElement = document.getElementById('textSearch')


const buttonContainer = document.getElementById("buttonBox")
const addButton = document.getElementById('addButton')
const importButton = document.getElementById('importButton')
const fileInput = document.getElementById('fileInput')
const exportButton = document.getElementById('exportButton')
const removeButton = document.getElementById('removeButton')

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

var exampleCompanies = [
    new Company(
        "Wagner Machine Co",
        ["Machining"],
        "Offers machining services.",
        "1804 N Market St, Champaign, IL 61822",
        "1982",
        "https://wagner-machine.com",
        {
            name: "Kurt Wagner",
            number: "217-384-0072",
            email: "kurt.wagner@wagner-machine.com"
        }
    ),

    new Company(
        "Wright Photography",
        ["Art", "Design", "Media"],
        "Photographer: Weddings, Special Events",
        "1826 Parkdale Dr. Champaign, IL 61821",
        "2008",
        "https://www.wright-photographs.com",
        {
            name: "Kelsey Wright",
            number: "217-637-0671",
            email: "connect@wright-photographs.com"
        }
    ),

    new Company(
        "Maatuka Al-Heeti Emkes Attornys at Law",
        ["Attorneys", "Legal"],
        "Legal Services",
        "303 S. Mattis Ave. Suite 201 Champaign, IL 61821",
        "1975",
        "https://www.maelaw.net",
        {
            name: "Jennifer L. Zang",
            number: "217-337-0700",
            email: "receptionist@maelaw.net"
        }
    ),

    new Company(
        "Dixon Graphics",
        ["Commercial Printing"],
        "Large-format printing, art printing, bookmaking, and full-color screen-printed t-shirts",
        "105 West John Street, Champaign, IL 61820",
        "2012",
        "https://www.dixongraphics.com",
        {
            name: "Lance Dixon",
            number: "217-351-6100",
            email: "lance@dixongraphics.com"
        }
    ),

    new Company(
        "Art Mart",
        ["Modern Living"],
        "Deli, bakery, wine, housewares groceries, toys, gifts, and catering",
        "1705 S Prospect Ave, Champaign, IL 61820",
        "1958",
        "https://www.shopartmart.com",
        {
            name: "Not Available",
            number: "217-344-7979",
            email: "artmartfood@gmail.com"
        }
    ),

    new Company(
        "Fire Doll Studio",
        ["Art", "Design"],
        "Artisan chandlery with a passion for health, sustainability, and the art of candle making.",
        "29 East Main Street, Champaign, IL 61820",
        "2011",
        "https://www.firedollstudio.com",
        {
            name: "Kayla Brown",
            number: "217-689-0045",
            email: "info@firedollstudio.com"
        }
    ),

    new Company(
        "Jos. Kuhn & Co",
        ["Formal Wear"],
        "Now selling men’s clothing, Kunh’s caters to regular sizes as well as big and tall.",
        "33 East Main Street, Champaign, IL 61820",
        "1874",
        "https://joskuhn.com",
        {
            name: "Not Available",
            number: "217-352-7666",
            email: "Not Available"
        }
    ),

    new Company(
        "Sunset Funeral Home",
        ["Funeral Services"],
        "providing the finest facilities, best value, friendly and caring staff to meet the needs of all served.",
        "710 North Neil Street, Champaign, IL 61820",
        1984,
        "https://www.sunsetfuneralhome.com",
        {
            name: "Stephanie Bailey",
            number: "217-239-2874",
            email: "Not Available"
        }
    ),

    new Company(
        "The Literary",
        ["Bookstore, Bar"],
        "Bookstore & bar serving up the finest wine, beer, and reads on planet earth.",
        "124 North Neil Street, Champaign, IL 61821",
        "2021",
        "https://www.literarybookbar.com",
        {
            name: "Jenny Shima",
            number: "217-954-1500",
            email: "gm@literarybookbar.com"
        }
    ),

    new Company(
        "Wurth Chiropractic Center",
        ["Medical Services"],
        "Affordable chiropractic services for the Champaign community",
        "201 W Springfield Ave, Champaign, IL 61820",
        "2020",
        "https://wurthchiropracticcenter.com",
        {
            name: "Dave Wurth",
            number: "217-552-1098",
            email: "Not Available"
        }
    ),

    new Company(
        "Clanin Marketing",
        ["Business Marketing"],
        "Helps businesses strengthen their brand, streamline marketing efforts, and develop strategies to reach their goals.",
        "348 North Neil St, Champaign, IL 61820",
        "2014",
        "https://www.claninmarketing.com",
        {
            name: "Scott Clanin",
            number: "217-402-8077",
            email: "Not Available"
        }
    ),

    new Company(
        "Glass FX",
        ["Glass Works"],
        "Making and repairing stained and decorative glass",
        "103 E Clark St, Champaign, IL 61820",
        "1971",
        "https://www.glassfx.com",
        {
            name: "Richard Taylor",
            number: "217-359-0048",
            email: "rltaylor48@sbcglobal.net"
        }
    ),

    new Company(
        "Furniture Lounge",
        ["Furniture Store"],
        "Specializing in mid-century modern furniture, home décor, vintage clothing, and records",
        "11 East University Avenue, Champaign, IL 61820",
        2002,
        "http://www.furniturelounge.net",
        {
            name: "Not Available",
            number: "217-418-5388",
            email: "furniturelounge@sbcglobal.net"
        }
    ),

    new Company(
        "mLAB Fitness",
        ["Fitness"],
        "Personal Training and Group Fitness Studio",
        "122 North 1st Street, Champaign, IL 61822",
        2013,
        "https://slurbon-champaign.com",
        {
            name: "Matt Rossbach",
            number: "217-305-5859",
            email: "mlabfitness@gmail.com"
        }
    ),

    new Company(
        "Martinelli’s Market",
        ["Deli, Bakery"],
        "Wholesale bakery and deli items",
        "500 N Walnut St, Champaign, IL 61820",
        "1990",
        "https://www.martinellismarketchampaign.com",
        {
            name: "Jeffrey Brokish",
            number: "217-607-1306",
            email: "office@martinellismarket.com"
        }
    ),

    new Company(
        "Merrybeth Farm Carriage",
        ["Horse Rides"],
        "Horse & carriage service or wagon rides for weddings, anniversaries, birthdays, and other special events.",
        "1566 County Road 400 E, Champaign, IL 61822",
        1927,
        "http://merrybethfarms.webs.com",
        {
            name: "Not Available",
            number: "217-369-4205",
            email: "mb2farm@gmail.com"
        }
    ),

    new Company(
        "Planted",
        ["Plants"],
        "Boutique plant shop with a wide variety of house plants, planters and gifts.",
        "16 East Washington Street, Champaign, IL 61820",
        2017,
        "https://www.plantedcu.com",
        {
            name: "Not Available",
            number: "217-974-1880",
            email: "plantedcu@gmail.com"
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

if (getCompaniesList()) {
    companiesList = getCompaniesList();
    console.log("existing user data found, loading")
}
//console.log(companiesList[0].contact.name);
refreshList(false)

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
        companyElements[l].button.style.width = "";
        if (simpleSearch(companiesList[l][searchParam].toString(), textInput.toString())) {
            companyElements[l].button.style.display = "flex"
            companyElements[l].button.style.scale = "1"
            trueTimes++
        } else {
            companyElements[l].button.style.display = "none"
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
        addWidthClass(companyElements[i].button, "wide")
    }
    currentIndex = -1;
}


//creates button events
function buttonEvents() {
    for (let i = 0; i < companiesList.length; i++) {
        companyElements[i].button.addEventListener('click', () => {
            companyInfoClicked(companiesList[i], i)
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
    document.getElementById("addContainer").classList.remove("disappear")
    document.getElementById("addContainer").classList.add("appear")
})

fileInput.addEventListener('change', async () => {
    try {
        companiesList = await importFromJson(fileInput)
        storeCompaniesList();
        refreshList(false)
    } catch (error) {
        console.error('Error reading the JSON file:', error);
    }
});

exportButton.addEventListener('click', () => {
    exportToJson(companiesList, 'companiesList.json');

})

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

function addListItem(newCompany) {
    companiesList.push(newCompany)
    refreshList(false)
    companyInfoClicked(newCompany, companiesList.length - 1)
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
    document.querySelector('.additional_buttons').style.scale = '1';
    document.querySelector('.container').style.height = '140px';
});

document.querySelector('.container').addEventListener('mouseleave', function () {
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

//Cookie stuff
function storeCompaniesList() {
    sessionStorage.setItem('companiesList', JSON.stringify(companiesList));
}

function getCompaniesList() {
    const storedCompaniesList = sessionStorage.getItem('companiesList');
    return storedCompaniesList ? JSON.parse(storedCompaniesList) : false;
}



