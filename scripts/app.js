const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const feedback = document.querySelector('.feedback');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast();
const updateUI = (data) => {

    console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //DESTRUCTURE PROPERTIES
    const {cityDets, weather} = data;

    //update details
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;


    const iconSrc = `imgs/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)


    let timeSrc = weather.IsDayTime ? 'imgs/day.svg' : 'imgs/night.svg'
    time.setAttribute('src', timeSrc);

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
}};
cityForm.addEventListener('submit', e =>{
    e.preventDefault();
    
        //get city value
    const city = cityForm.city.value.trim();
    if(city.length === 0){
        feedback.textContent = 'Not a valid city!';
        card.classList.add('d-none');
        formInput.classList.add('errorsubmit');
    }
    else{
    cityForm.reset();
    feedback.textContent = '';
    //update the new UI with the new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
    }

    //set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}