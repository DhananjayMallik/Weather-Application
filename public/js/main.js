const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real = document.getElementById('temp_real');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer'); // hide the css class 

const getInfo = async (e) => {
    e.preventDefault(); // prevents form submission
    let cityVal = cityName.value.trim(); // trim spaces

    if (cityVal === '') {
        city_name.innerText = `Please enter a city name before searching.`;
        dataHide.classList.add('data_hide'); // add hide class
    } else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=2929e64e0a0900d8ca748a3ad2c71d23`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error("Invalid city");
            }

            city_name.innerText = `${data.name}, ${data.sys.country}`;
            temp_real.innerText = data.main.temp;

            // Weather condition icon handling
            const tempMood = data.weather[0].main;
            if (tempMood === "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            } else if (tempMood === "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            } else if (tempMood === "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-showers-heavy' style='color:#a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-smog' style='color:#f1f2f6;'></i>";
            }

            dataHide.classList.remove('data_hide');

        } catch (error) {
            city_name.innerText = `Please enter a valid city name.`;
            dataHide.classList.add('data_hide');
        }
    }
};

submitBtn.addEventListener('click', getInfo);
