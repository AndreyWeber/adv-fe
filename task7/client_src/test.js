;$(function () {
    "use strict";

    function fetchAndParse(endpoint, parserCb) {
        endpoint = endpoint || '';

        return fetch(endpoint)
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
    var allComments = [];
    var allUsers = [];
    var promises = [];
    promises.push(fetchAndParse('json-server/posts/466', function (post) {
        post = post || {};
        allComments = post.hasOwnProperty('comments') ? post.comments : [];
    }));

    // A.W.: I didn't understand how to organize chain of promises or
    //       user Promise.all/Promise.race to fetch users with requests like
    //      '/json-server/users/{id}'. Clarification needed.
    promises.push(fetchAndParse('/json-server/users/', function (users) {
        allUsers = users || [];
    }));

    Promise.all(promises).then(function () {
        return allComments.map(function (comment) {
            var user = $.grep(allUsers, function (u) {
                return u.id === comment.user;
            })[0];
            comment.user = user.name;

            return comment.user + ': ' + comment.text;
        });
    }).then(function (comments) {
        comments = comments || [];

        $('.content__all-comments').html(comments.join('; '));
    });
});