require('dotenv').config();
const moment = require("moment");

document.querySelector('#searchButton').addEventListener('click', () => {
    const api_key = process.env.API_KEY;

    var cityName = $("#cityInput").val();

    if (cityName === '') {
        $("#resultDiv").hide();
        $("#messageDiv").show();

        $("#messageDiv").empty();
        $("#messageDiv").append("<p'>City field is empty. <br>Enter city name and click the button.</p>");
    }

    else {
        $("#messageDiv").hide();
        $("#resultDiv").show();

        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&lang=en&appid=" + api_key, function (data) {
            var iconCode = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

            $("#resultH5").empty();
            $("#resultH5").append("<b>Weather in " + data.name + ", " + data.sys.country + "</b><img class='center' id='iconWeather' src='' alt='icon'></img>");
            $('#iconWeather').attr('src', iconUrl);

            $("#temperatureTd").empty();
            $("#temperatureTd").append(Math.round(data.main.temp) + " °C");

            $("#windTd").empty();
            $("#windTd").append(data.wind.speed + " m/s");

            $("#pressureTd").empty();
            $("#pressureTd").append(data.main.pressure + " hpa");

            $("#humidityTd").empty();
            $("#humidityTd").append(data.main.humidity + " %");

            $("#sunriseTd").empty();
            $("#sunriseTd").append(moment(data.sys.sunrise).format('LT'));
        })
        // .fail(function () {
        //     $("#resultDiv").empty();
        //     $("#resultDiv").append("<p>Error</p>");
        // })
    }
})