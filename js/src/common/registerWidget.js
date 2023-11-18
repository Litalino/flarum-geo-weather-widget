/*
 * This file is part of Geo Weather Widget.
 *
 * Copyright (c) 2023 Litalino.
 * https://khatvongsong.vn
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import Widgets from 'flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets';
import geoWeatherWidget from './components/geoWeatherWidget';

export default function (app) {
    new Widgets()
        .add({
            key: 'geoWeatherWidget',
            component: geoWeatherWidget,
            isDisabled: false,
            isUnique: true,
            placement: 'end',
            position: 1,
        })
        .extend(app, 'litalino-geo-weather-widget');
}