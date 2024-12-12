// src/notifications.js

import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
    encrypted: true,
});

export default pusher;
