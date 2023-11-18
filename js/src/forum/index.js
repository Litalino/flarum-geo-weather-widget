/*
 * This file is part of Geo Weather Widget.
 *
 * Copyright (c) 2023 Litalino.
 * https://khatvongsong,vn
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from 'flarum/forum/app';
import registerWidget from '../common/registerWidget';

app.initializers.add('litalino/geo-weather-widget', () => {
    registerWidget(app);
});