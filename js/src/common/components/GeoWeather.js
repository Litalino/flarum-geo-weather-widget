/*
 * This file is part of justoverclock/flarum-ext-skypemoji.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from "flarum/forum/app";

export default function () {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      alert(app.translator.trans("geo-weather.forum.not-supported"));
    }
  }

  function getWeather(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let API_KEY = app.forum.attribute("wheaterApiKey");
    let lang = app.forum.attribute("lang") || "en";
    //let baseURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=${lang}&appid=${API_KEY}`;
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=${lang}&appid=${API_KEY}&exclude=hourly,daily`;
    //let baseURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${API_KEY}&units=metric&lang=${lang}`;
    //let baseURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&lang=${lang}&appid=${API_KEY}&exclude=hourly,daily`;
    //let baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=50.7001&lon=4.988987&appid=364d01e717bf215a28cc072aed7234cd&units=metric&lang=vi`;

    const iconCodes = {
      "01d":
        '<img src="https://openweathermap.org/img/wn/01d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "01n":
        '<img src="https://openweathermap.org/img/wn/01n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "02d":
        '<img src="https://openweathermap.org/img/wn/02d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "02n":
        '<img src="https://openweathermap.org/img/wn/02n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "03d":
        '<img src="https://openweathermap.org/img/wn/03d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "03n":
        '<img src="https://openweathermap.org/img/wn/03n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "04d":
        '<img src="https://openweathermap.org/img/wn/04d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "04n":
        '<img src="https://openweathermap.org/img/wn/04n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "09d":
        '<img src="https://openweathermap.org/img/wn/09d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "09n":
        '<img src="https://openweathermap.org/img/wn/09n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "10d":
        '<img src="https://openweathermap.org/img/wn/10d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "10n":
        '<img src="https://openweathermap.org/img/wn/10n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "11d":
        '<img src="https://openweathermap.org/img/wn/11d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "11n":
        '<img src="https://openweathermap.org/img/wn/11n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "13d":
        '<img src="https://openweathermap.org/img/wn/13d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "13n":
        '<img src="https://openweathermap.org/img/wn/13n@2x.png" height="42" width="42" style="vertical-align: middle">',
      "50d":
        '<img src="https://openweathermap.org/img/wn/50d@2x.png" height="42" width="42" style="vertical-align: middle">',
      "50n":
        '<img src="https://openweathermap.org/img/wn/50n@2x.png" height="42" width="42" style="vertical-align: middle">',
    };
    https: $.get(baseURL, function (res) {
      //let data = res.current;
      //let temp = Math.floor(data.temp - 273);
      let temp = Math.floor(res.main.temp - 273);
      //let condition = data.weather[0].description;
      let condition = res.weather[0].description;
      let icon = iconCodes[res.weather[0].icon]; //res.weather[0].icon;

      let wind = res.wind.speed;
      let clouds = res.clouds.all;
      let rain = ''; //res.rain.`1h`;
      let humidity = res.main.humidity;

      $("#temp-main").html(`${temp}°`);
      //$("#condition").html(condition);
      $("#condition").html(function () {
        var txt = "<em>" + icon + condition + " </em>";
        return " " + txt + " ";
      });
      //$("#icon").html(icon);
      //$("#wind").html(wind);
      $("#wind").html(function () {
        var txt =
          "<em>" + app.translator.trans("geo-weather.forum.wind") + ": " +
          wind +
          " </em>";
        return "  " + txt + " ";
      });
      //$("#clouds").html("Clouds "+ clouds);
      $("#clouds").html(function () {
        var txt =
          "<em>" + app.translator.trans("geo-weather.forum.clouds") + ": " +
          clouds + 
          " % </em>";
        return "  " + txt + " ";
      });

      $("#rain").html(function () {
        var txt =
          "<em>" +
          app.translator.trans("geo-weather.forum.rain") +
          ": " +
          rain +
          " </em>";
        return "  " + txt + " ";
      });

      $("#humidity").html(function () {
        var txt =
          "<em>" +
          app.translator.trans("geo-weather.forum.humidity") +
          ": " +
          humidity +
          " % </em>";
        return "  " + txt + " ";
      });

    });
  }

  getLocation();
}
