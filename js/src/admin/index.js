/*
 * This file is part of Geo Weather Widget.
 *
 * Copyright (c) 2023 Litalino.
 * https://khatvongsong,vn
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from "flarum/admin/app";
import registerWidget from '../common/registerWidget';

app.initializers.add("litalino/geo-weather-widget", () => {
  registerWidget(app);
  app.extensionData
    .for("litalino-geo-weather-widget")
    .registerSetting({
      setting: "litalino-geo-weather-widget.lang",
      name: "lang",
      type: "text",
      label: app.translator.trans("geo-weather.admin.lang"),
      help: app.translator.trans("geo-weather.admin.lang-help"),
    })
    .registerSetting({
      setting: "litalino-geo-weather-widget.wheaterApiKey",
      name: "wheaterApiKey",
      type: "text",
      label: app.translator.trans("geo-weather.admin.apiKey"),
      help: app.translator.trans("geo-weather.admin.apiKey-help"),
    });
});
