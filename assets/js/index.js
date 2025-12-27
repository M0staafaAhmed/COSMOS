const navLinks = document.getElementsByTagName("nav")[0]
const siteSections = document.getElementById("siteSections").children

const sidebarToggle = document.getElementById("sidebar-toggle")
const overlay = document.querySelector(".overlay")
const sidebar = document.getElementById("sidebar")

const apodDateInput = document.getElementById("apod-date-input")
const apodDate = document.getElementById("apod-date")
const apodDateInputShow = document.querySelector(".date-input-wrapper").children[1]
const apodLoading = document.getElementById("apod-loading")
const apodImage = document.getElementById("apod-image")
const apodImageLink = document.getElementById("apodImageLink")
const apodTitle = document.getElementById("apod-title")
const apodDateDetail = document.getElementById("apod-date-detail")
const apodDescription = document.getElementById("apod-explanation")
const apodCopyright = document.getElementById("apod-copyright")
const apodDateInfo = document.getElementById("apod-date-info")
const apodMediaType = document.getElementById("apod-media-type")
const loadDateBtn = document.getElementById("load-date-btn")
const todayApodBtn = document.getElementById("today-apod-btn")
const imageContainer = document.getElementById("imageContainer")
const videoContainer = document.getElementById("videoContainer")
const apiKey = "xsGOFurXCWWp7x7BPbduhLJbPufGlrTE0Vxbfuk4"
const todayDate = new Date();
apodDateInput.max = todayDate.toISOString().split('T')[0]
getTodayAbod(apiKey, todayDate)


const launchStatues = document.getElementById("launchStatues")
const launchTitle = document.getElementById("launchTitle")
const launchProvider = document.getElementById("launchProvider")
const launchRocket = document.getElementById("launchRocket")
const daysUntilLaunch = document.getElementById("daysUntilLaunch")
const launchDate = document.getElementById("launchDate")
const launchTime = document.getElementById("launchTime")
const LaunchLocation = document.getElementById("LaunchLocation")
const launchCountry = document.getElementById("launchCountry")
const launchDesc = document.getElementById("launchDesc")
const launchImage = document.getElementById("launchImage")
const launchesContainer = document.getElementById("launches-grid")


const planetDetailImage = document.getElementById("planet-detail-image")
const planetsGrid = document.getElementById("planets-grid")
const planetDetailName = document.getElementById("planet-detail-name")
const planetDetailDescription = document.getElementById("planet-detail-description")
const planetDistance = document.getElementById("planet-distance")
const planetRadius = document.getElementById("planet-radius")
const planetMass = document.getElementById("planet-mass")
const planetDensity = document.getElementById("planet-density")
const planetOrbitalPeriod = document.getElementById("planet-orbital-period")
const planetRotation = document.getElementById("planet-rotation")
const planetMoons = document.getElementById("planet-moons")
const planetGravity = document.getElementById("planet-gravity")
const planetDiscoverer = document.getElementById("planet-discoverer")
const planetDiscoveryDate = document.getElementById("planet-discovery-date")
const planetBodyType = document.getElementById("planet-body-type")
const planetVolume = document.getElementById("planet-volume")
const planetPerihelion = document.getElementById("planet-perihelion")
const planetAphelion = document.getElementById("planet-aphelion")
const planetEccentricity = document.getElementById("planet-eccentricity")
const planetInclination = document.getElementById("planet-inclination")
const planetAxialTilt = document.getElementById("planet-axial-tilt")
const planetTemp = document.getElementById("planet-temp")
const planetEscape = document.getElementById("planet-escape")




navLinks.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest(".nav-link")

    if (!clickedBtn) return;

    for (let i = 0; i < siteSections.length; i++) {
        if (siteSections[i].getAttribute("data-section") == clickedBtn.getAttribute("data-section")) {
            siteSections[i].classList.remove("hidden")
            navLinks.children[i].classList.add("bg-blue-500/10", "text-blue-400")
            navLinks.children[i].classList.remove("text-slate-300", "hover:bg-slate-800")
        } else {
            siteSections[i].classList.add("hidden")
            navLinks.children[i].classList.remove("bg-blue-500/10", "text-blue-400")
            navLinks.children[i].classList.add("text-slate-300", "hover:bg-slate-800")
        }
    }

    if (clickedBtn.getAttribute("data-section") == "launches") {
        getLaunches()
    }else if (clickedBtn.getAttribute("data-section") == "planets") {
        getPlanets()
    }


})


sidebarToggle.addEventListener("click", toggleSidebar)
overlay.addEventListener("click", toggleSidebar)

apodDateInput.addEventListener("input", () => {
    const displayDate = new Date(apodDateInput.value);
    const shortMonth = displayDate.toLocaleString("en-US", { month: "short" });
    const day = displayDate.getDate();
    const year = displayDate.getFullYear();
    apodDateInputShow.innerText = `${shortMonth} ${day}, ${year}`
})

loadDateBtn.addEventListener("click", () => {
    const userDate = new Date(apodDateInput.value);
    getTodayAbod(apiKey, userDate)
})

todayApodBtn.addEventListener("click", () => {
    getTodayAbod(apiKey, todayDate)
})


function toggleSidebar() {
    sidebar.classList.toggle("sidebar-open")
    overlay.classList.toggle("hidden")
}

async function getTodayAbod(api, dayDate) {

    const day = dayDate.getDate();
    const month = dayDate.getMonth() + 1;
    const year = dayDate.getFullYear();

    todayDate.getDay

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api}&date=${year}-${month}-${day}`)

    let data;
    try {
        apodLoading.classList.remove("hidden")
        imageContainer.classList.add("hidden")
        videoContainer.classList.add("hidden")
        apodDate.innerText = "Loading..."
        apodTitle.innerText = "Loading..."
        apodDateDetail.innerText = "Loading..."
        apodDescription.innerText = "Loading Descrption..."
        apodDateInfo.innerText = "Loading..."
        data = await response.json()
        displayToday(data)
    } catch (error) {
        apodDate.innerText = "Invalid Date"
        apodTitle.innerText = ""
        apodDateDetail.innerText = "Invalid Date"
        apodDescription.innerText = ""
        apodDateInfo.innerText = "Invalid Date"
    } finally {
        apodLoading.classList.add("hidden")
        if (data.media_type == "video") {
            videoContainer.classList.remove("hidden")
        } else {
            imageContainer.classList.remove("hidden")
        }
    }

}

function displayToday(todayAbod) {
    const displayDate = new Date(todayAbod.date);
    const shortMonth = displayDate.toLocaleString("en-US", { month: "short" });
    const day = displayDate.getDate();
    const year = displayDate.getFullYear();

    apodDate.innerText = `${shortMonth} ${day}, ${year}`
    apodDateInput.value = todayAbod.date;
    apodDateInputShow.innerText = `${shortMonth} ${day}, ${year}`
    if (todayAbod.media_type == "video") {
        videoContainer.children[0].setAttribute("src", todayAbod.url)
    } else {
        apodImageLink.setAttribute("href", todayAbod.hdurl)
        apodImage.setAttribute("src", todayAbod.hdurl)
    }
    apodTitle.innerText = todayAbod.title
    apodDateDetail.innerText = `${shortMonth} ${day}, ${year}`
    apodDescription.innerText = todayAbod.explanation
    if (todayAbod.copyright) {
        apodCopyright.innerhtml = `&copy; ${todayAbod.copyright}`
    }
    apodDateInfo.innerText = `${shortMonth} ${day}, ${year}`
    apodMediaType.innerText = todayAbod.media_type
}



async function getLaunches() {
    const response = await fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming/?format=json")
    const launchesResponse = await response.json()
    const launchesData = launchesResponse.results

    displayLaunches(launchesData)

}

function displayLaunches(launchesData) {

    const daysUntil = Math.max(0, Math.ceil((new Date(launchesData[0].net) - new Date()) / (1000 * 60 * 60 * 24)));
    const displayDate = new Date(launchesData[0].net);
    const shortMonth = displayDate.toLocaleString("en-US", { month: "short" });
    const day = displayDate.getDate();
    const year = displayDate.getFullYear();
    const hours = displayDate.getHours();
    const minutes = displayDate.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const minutesFormatted = minutes.toString().padStart(2, "0");




    launchStatues.innerText = launchesData[0].status.abbrev
    launchTitle.innerText = launchesData[0].name
    launchProvider.innerText = launchesData[0].launch_service_provider.name
    launchRocket.innerText = launchesData[0].rocket.configuration.name
    daysUntilLaunch.innerText = daysUntil
    launchDate.innerText = `${shortMonth} ${day}, ${year}`
    launchTime.innerText = `${hour12}:${minutesFormatted} ${period} UTC`
    LaunchLocation.innerText = launchesData[0].pad.location.name
    launchCountry.innerText = launchesData[0].pad.country.name
    launchDesc.innerText = launchesData[0].mission.description
    launchImage.style.cssText = `
        background-image: url(${launchesData[0].image.image_url});
        background-position: center;
        background-size: cover;
    `

    for (let i = 1; i < launchesData.length; i++) {
        launchesContainer.appendChild(createLaunchCard(launchesData[i]))
    }

}

function createLaunchCard(data) {
    const displayDate = new Date(data.net);
    const shortMonth = displayDate.toLocaleString("en-US", { month: "short" });
    const day = displayDate.getDate();
    const year = displayDate.getFullYear();
    const hours = displayDate.getHours();
    const minutes = displayDate.getMinutes();
    const hour12 = hours % 12 || 12;
    const minutesFormatted = minutes.toString().padStart(2, "0");

    const card = document.createElement("div");
    card.className =
        "bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer";

    // ===== الجزء العلوي =====
    const top = document.createElement("div");
    top.className =
        "relative h-48 bg-slate-900/50 flex items-center justify-center";

    if (data.image.image_url) {
        const img = document.createElement("img");
        img.src = data.image.image_url;
        img.alt = data.name;
        img.className = "w-full h-full object-cover";

        top.appendChild(img);
    } else {
        const icon = document.createElement("i");
        icon.className = "fas fa-space-shuttle text-5xl text-slate-700";

        top.appendChild(icon);
    }

    const badgeWrapper = document.createElement("div");
    badgeWrapper.className = "absolute top-3 right-3";

    const badge = document.createElement("span");
    badge.className =
        "px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold";
    badge.textContent = data.status.abbrev;

    badgeWrapper.appendChild(badge);
    top.appendChild(badgeWrapper);


    const content = document.createElement("div");
    content.className = "p-5";

    const header = document.createElement("div");
    header.className = "mb-3";

    const title = document.createElement("h4");
    title.className =
        "font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors";
    title.textContent = data.name;

    const company = document.createElement("p");
    company.className = "text-sm text-slate-400 flex items-center gap-2";

    const companyIcon = document.createElement("i");
    companyIcon.className = "fas fa-building text-xs";

    company.appendChild(companyIcon);
    company.append(data.launch_service_provider.name);

    header.appendChild(title);
    header.appendChild(company);

    const details = document.createElement("div");
    details.className = "space-y-2 mb-4";

    function createDetail(iconClass, text) {
        const row = document.createElement("div");
        row.className = "flex items-center gap-2 text-sm";

        const icon = document.createElement("i");
        icon.className = `${iconClass} text-slate-500 w-4`;

        const span = document.createElement("span");
        span.className = "text-slate-300";
        span.textContent = text;

        row.appendChild(icon);
        row.appendChild(span);
        return row;
    }

    details.appendChild(createDetail("fas fa-calendar", `${shortMonth} ${day}, ${year}`));
    details.appendChild(createDetail("fas fa-clock", `${hour12}:${minutesFormatted} UTC`));
    details.appendChild(createDetail("fas fa-rocket", data.rocket.configuration.name));
    details.appendChild(createDetail("fas fa-map-marker-alt", truncateText(data.pad.location.name, 30)));

    const footer = document.createElement("div");
    footer.className =
        "flex items-center gap-2 pt-4 border-t border-slate-700";

    const detailsBtn = document.createElement("button");
    detailsBtn.className =
        "flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold";
    detailsBtn.textContent = "Details";

    const favBtn = document.createElement("button");
    favBtn.className =
        "px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors";

    const heartIcon = document.createElement("i");
    heartIcon.className = "far fa-heart";

    favBtn.appendChild(heartIcon);

    footer.appendChild(detailsBtn);
    footer.appendChild(favBtn);

    content.appendChild(header);
    content.appendChild(details);
    content.appendChild(footer);

    card.appendChild(top);
    card.appendChild(content);

    return card;
}


function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}


async function getPlanets() {

    const response = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
    const data = await response.json();
    const planets = data.bodies

    displayPlanets(planets)
}

function displayPlanets(planets) {
    const colors = ["#06b6d4", "#2563eb", "#fb923c", "#ef4444", "#eab308", "#facc15", "#3b82f6", "#f97316"]

    for (let i = 0; i < planets.length; i++) {
        planetsGrid.appendChild(createPlanetCard(planets[i], colors[i]))
    }
    displayPlanetInfo(planets[6])
}

function createPlanetCard(data , color) {
    const AU = 1495978707;
    const distanceMeters = data.semimajorAxis;
    const distanceAU = distanceMeters / AU;

    const card = document.createElement("div");
    card.className =
        "planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group";
    card.dataset.planetId = data.id;
    card.style.setProperty("--planet-color", color);

    card.addEventListener("mouseover", () => {
        card.style.borderColor = `${color}80`;
    });

    card.addEventListener("mouseout", () => {
        card.style.borderColor = "#334155";
    });

    const imgWrapper = document.createElement("div");
    imgWrapper.className =
        "relative mb-3 h-24 flex items-center justify-center";

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = data.englishName;
    img.className =
        "w-20 h-20 object-contain group-hover:scale-110 transition-transform";

    imgWrapper.appendChild(img);

    const title = document.createElement("h4");
    title.className = "font-semibold text-center text-sm";
    title.textContent = data.englishName;

    const distance = document.createElement("p");
    distance.className = "text-xs text-slate-400 text-center";
    distance.textContent = distanceAU.toFixed(2) + " AU";

    card.appendChild(imgWrapper);
    card.appendChild(title);
    card.appendChild(distance);

    card.addEventListener("click" , ()=>{
        displayPlanetInfo(data)
    })

    return card;
}



function displayPlanetInfo(planet) {

    planetDetailImage.setAttribute("src" , planet.image)
    planetDetailName.innerText = planet.englishName;
    planetDetailDescription.innerText = planet.description;
    planetDistance.innerText = planet.semimajorAxis + " M";
    planetRadius.innerText = planet.meanRadius + " M";
    planetMass.innerText = planet.mass.massValue;
    planetDensity.innerText = planet.density
    planetOrbitalPeriod.innerText = planet.sideralOrbit
    planetRotation.innerText = planet.sideralRotation
    planetMoons.innerText = planet.moons.length
    planetGravity.innerText = planet.gravity
    planetDiscoverer.innerText = planet.discoveredBy ?  planet.discoveredBy : "Known since antiquity"
    planetDiscoveryDate.innerText = planet.discoveryDate ?  planet.discoveryDate : "Ancient times"
    planetBodyType.innerText = planet.bodyType
    planetVolume.innerText = planet.vol.volValue + " * 10^13 km³"
    planetPerihelion.innerText = planet.perihelion + " M"
    planetAphelion.innerText = planet.aphelion + " M"
    planetEccentricity.innerText = planet.eccentricity
    planetInclination.innerText = planet.inclination
    planetAxialTilt.innerText = planet.axialTilt + "°"
    planetTemp.innerText = planet.avgTemp + "°C"
    planetEscape.innerText = planet.escape + " m/s"
}












