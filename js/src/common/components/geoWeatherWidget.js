/*
 * This file is part of Geo Weather Widget.
 *
 * Copyright (c) 2023 Litalino.
 * https://khatvongsong,vn
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import Widget from "flarum/extensions/afrux-forum-widgets-core/common/components/Widget";
//import app from 'flarum/forum/app';
//import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
//import Link from "flarum/common/components/Link";

import app from "flarum/forum/app";
import { extend } from "flarum/common/extend";
import IndexPage from "flarum/forum/components/IndexPage";
import GeoWeather from "./GeoWeather";
import Page from "flarum/common/components/Page";
import extractText from "flarum/common/utils/extractText";
import ItemList from "flarum/common/utils/ItemList";

export default class geoWeatherWidget extends Widget {
  className() {
    // Widget title.
    return "Litalino-GeoWeatherWidget";
  }

  icon() {
    // Widget icon.
    return "fas fa-chart-pie";
  }

  title() {
    // Widget title.
    return extractText(app.translator.trans("geo-weather.forum.widget.title"));
  }

  content() {
    extend(Page.prototype, ["oncreate", "onupdate"], GeoWeather);
    extend(IndexPage.prototype, "oncreate", function () {
      function settingClock() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();

        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (second < 10) {
          second = "0" + second;
        }

        var frame = document.getElementById("time");
        frame.innerHTML = hour + ":" + minute + ":" + second;
      }

      this.timeInterval = setInterval(settingClock, 500);
    });
    extend(IndexPage.prototype, "onremove", function () {
      clearInterval(this.timeInterval);
    });

    /*const bgimage =
      app.forum.attribute("baseUrl") +
      "/assets/extensions/litalino-geo-weather-widget/4seasons.gif";
    return
    m(
      "div",
      {
        className: "weather",
        style: "background-image: url(" + bgimage + ")",
      },
      [
        m(
          "div",
          { id: "temp-main" },
          app.translator.trans("geo-weather.forum.temp")
        ),
        m("div", { id: "time" }),

        m(
          "div",
          { id: "condition" },
          app.translator.trans("geo-weather.forum.unknown")
        ),
        m(
          "ul",
          { className: "col-w-c" },
          m(
            "li",
            { id: "wind" },
            app.translator.trans("geo-weather.forum.wind")
          ),
          m(
            "li",
            { id: "clouds" },
            app.translator.trans("geo-weather.forum.clouds")
          ),
          //m(
          //    "li",
          //    { id: "rain" },
          //    app.translator.trans("geo-weather.forum.rain")
          //  )
          m(
            "li",
            { id: "humidity" },
            app.translator.trans("geo-weather.forum.humidity")
          )
        ),
      ]
    );*/
    const items = this.items().toArray();

    if (items.length === 0) return;

    return <div class="item-GeoWeatherWg">{items}</div>;
  }

  items() {
    const items = new ItemList();

    const bgimage =
      app.forum.attribute("baseUrl") +
      "/assets/extensions/litalino-geo-weather-widget/4seasons.gif";
    items.add(
      "GeoWeatherWg",
      m(
        "div",
        {
          className: "weather",
          style: "background-image: url(" + bgimage + ")",
        },
        [
          m(
            "div",
            { id: "temp-main" },
            app.translator.trans("geo-weather.forum.temp")
          ),
          m("div", { id: "time" }),

          m(
            "div",
            { id: "condition" },
            app.translator.trans("geo-weather.forum.unknown")
          ),
          m(
            "ul",
            { className: "col-w-c" },
            m(
              "li",
              { id: "wind" },
              app.translator.trans("geo-weather.forum.wind")
            ),
            m(
              "li",
              { id: "clouds" },
              app.translator.trans("geo-weather.forum.clouds")
            ),
            /*m(
                  "li",
                  { id: "rain" },
                  app.translator.trans("geo-weather.forum.rain")
                ),*/
            m(
              "li",
              { id: "humidity" },
              app.translator.trans("geo-weather.forum.humidity")
            )
          ),
        ]
      ),
      10
    );

    return items;
  }
  
}