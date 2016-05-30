;$(function () {
    "use strict";

    function fetchAndParse(url, parserCb) {
        url = url || '';

        return fetch(url)
            .then(function(response) {
                console.log('status: ' + response.status + '; status text: ' + response.statusText +
                    '; url: ' + response.url);
                return response.json()
            }, function (reason) {
                console.log('rejected with the next reason: ' + reason);
            })
            .then(parserCb)
            .catch(function(ex) {
                console.log('JSON parsing failed', ex);
            });
    }

    // Update likes number for post with id = 466
    fetch('json-server/posts/466', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likeCount: 8
        })
    }).then(function (response) {
        console.log('status: ' + response.status + '; status text: ' + response.statusText +
            '; url: ' + response.url);
    }, function (reason) {
        console.log('rejected with the next reason: ' + reason);
    }).catch(function(ex) {
        console.log(ex);
    });

    // Get all posts, calculate sum of all likes, output value on the page
    fetchAndParse('json-server/posts', function (json) {
        json = json || {};

        var likesSum = 0;
        json.forEach(function (post) {
            if (post.hasOwnProperty('likeCount')) {
                likesSum += post.likeCount
            }
        });

        $('.content__likes-count').html("count of likes - " + likesSum);
    });

    // Get all comments to post with id = 466, output value on the page
    fetchAndParse('json-server/posts/466', function (post) {
        post = post || {};
        return post.hasOwnProperty('comments') ? post.comments : [];
    }).then(function (comments) {
        comments = comments || [];
        return comments.map(function (comment) {
            return fetchAndParse('/json-server/users/' + comment.user, function (user) {
                comment.user = user.name;
                return comment;
            });
        });
    }).then(function (promises) {
        Promise.all(promises).then(function (comments) {
            $('.content__all-comments').html(comments.map(function (c) {
                return c.user + ': ' + c.text;
            }).join('; '));
        });
    });
});