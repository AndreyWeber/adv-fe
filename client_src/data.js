(function () {
    "use strict";

    var global = window;
    global.Data = {
        getUsers: function () {
            return users;
        }
    };

    var users = [
        {
            "id": "aaa",
            "email": "testuser1@yandex.ua",
            "name": "testuser1",
            "image": "https://scontent-ams2-1.cdninstagram.com/t51.2885-15/e35/12545398_945000835580309_730600571_n.jpg",
            "password": "322e6eeaa1c49cb201a68bcff9b0567399ed4848e3b92046d063690616becaec",
            "following": {
                "tags": [],
                "users": []
            }
        },
        {
            "id": "aab",
            "email": "waka.waka@yandex.ua",
            "name": "Waka The Great",
            "image": "https://s-media-cache-ak0.pinimg.com/avatars/horujaya_1428587412_280.jpg",
            "password": "cb0c9e0026a21e8a0d5a163f4ae4a2e4978e22f8bc705840ebdad1a99762bf79",
            "following": {
                "tags": [
                    {
                        "name": "sport",
                        "active": true
                    },
                    {
                        "name": "climbing",
                        "active": true
                    }
                ],
                "users": [
                    {
                        "id": "aaa",
                        "active": true
                    },
                    {
                        "id": "aac",
                        "active": true
                    }
                ]
            }
        },
        {
            "id": "aac",
            "email": "qwerty@yandex.ua",
            "name": "qwerty",
            "image": "https://s-media-cache-ak0.pinimg.com/avatars/horujaya_1428587412_280.jpg",
            "password": "322e6eeaa1c49cb201a68bcff9b0567399ed4848e3b92046d063690616becaec",
            "following": {
                "tags": [],
                "users": []
            }
        },
        {
            "id": "aac",
            "email": "gloomy.bear@yandex.ua",
            "name": "Little Gloomy Bear",
            "image": "https://s-media-cache-ak0.pinimg.com/avatars/horujaya_1428587412_280.jpg",
            "password": "322e6eeaa1c49cb201a68bcff9b0567399ed4848e3b92046d063690616becaec",
            "following": {
                "tags": [],
                "users": []
            }
        }
    ];
})();
