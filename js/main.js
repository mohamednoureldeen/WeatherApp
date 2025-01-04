
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const searchInput = document.getElementById('search');

async function fetchWeather(city) {


    const  response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=054885e717db46e8b3293716240712&q=${city}&days=3`);

    if (response.ok) {
        const wetherData = await response.json();
        displayWeather(wetherData);
        displayForecast(wetherData);
        console.log(wetherData);
    }                           
}

function displayWeather(data) {
    const lastUpdated = new Date(data.current.last_updated.replace(" ", "T"));
    const day = days[lastUpdated.getDay()];
    const date = `${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}`;

    let html = `
    <div class="col-lg-4  g-0  " >
    <div class="card ">
            <div class="card-header d-flex justify-content-between bg-black text-bg-success">
                <div class="dey">${day}</div>
                <div class="date">${date}</div>
            </div>
            <div class="card-body hamada text-white  " id="today">
                <div class="location">
                    <h4 class="card-title" id="city">${data.location.name}</h4>
                </div>
                <div class="degree1">
                    <p class="card-text" id ="temp">${data.current.temp_c}<span>°C</span></p>
                </div>
                <div class="custom">
                    <div class="custom-icon">
                        <img src="${data.current.condition.icon}" alt="">
                    </div>
                    <p class="card-text" id="status">${data.current.condition.text}</p>
                </div>
                <div class="card-footer text-white-50 d-flex justify-content-between">
                <span>
                <i class="  fas fa-water"></i>
                ${data.current.humidity}%
                </span>
                <span>
                <i class="fas fa-wind"></i>
                ${data.current.wind_kph} kph
                </span>
                <span>
                <i class="fas fa-compass"></i>
                ${data.current.wind_dir}
                </span>
                </div>
                
            </div>
            </div>
        </div>
    `
    document.getElementById('forecast').innerHTML = html;
}

function displayForecast(data) {
    let forecastHTML = "";
    for (let i = 1; i < data.forecast.forecastday.length; i++) {
        const dayData = data.forecast.forecastday[i];
        const date = new Date(dayData.date.replace(" ", "T"));
        const dayName = days[date.getDay()];
        const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;

  
        const cardStyle = i === 1 ? "background-color:#262936; color: white;" : "color: white";
        

        forecastHTML += `
        <div class="col-lg-4 col-sm-12 g-0">
            <div class="card" style="${cardStyle}">
                <div class="card-header d-flex justify-content-center bg-black text-bg-success" style="${cardStyle}">
                    <div class="day">${dayName}</div>
                </div>
                <div class="card-body forecast text-center justify-content-center">
                    <div class="degree">
                        <div class="custom-icon mx-auto mb-4 mt-4">
                            <img src="${dayData.day.condition.icon}" alt="">
                        </div>
                        <p class="" id="temp">${dayData.day.maxtemp_c}<span>°C</span></p>
                        <span>${dayData.day.mintemp_c}°C</span>
                    </div>
                    <div class="custom">
                        <p class="card-text" id="status">${dayData.day.condition.text}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("forecast").innerHTML += forecastHTML;
}



fetchWeather('cairo');

searchInput.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchWeather(searchInput.value);
});

searchInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    fetchWeather(searchInput.value);
});


const navLinks = document.querySelectorAll('.navbar-nav .nav-link');


// navbar links
navLinks.forEach(link => {
  link.addEventListener('click', function () {

    navLinks.forEach(nav => nav.classList.remove('active'));
    

    this.classList.add('active');
  });
});
