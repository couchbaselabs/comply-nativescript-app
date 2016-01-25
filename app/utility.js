var httpModule = require("http");

exports.makePostRequest = function(url, params, body) {
    var fullUrl = url;
    if(params && params.length > 0) {
        fullUrl = fullUrl + "/" + params.join("/");
    }
    return new Promise((resolve, reject) => {
        httpModule.request({
            url: fullUrl,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(body)
        }).then(function(response) {
            resolve(response.content.toJSON());
        }, function(error) {
            reject(error);
        });
    });
}

exports.makeGetRequest = function(url, params) {
    var fullUrl = url;
    if(params && params.length > 0) {
        fullUrl = fullUrl + "/" + params.join("/");
    }
    return new Promise((resolve, reject) => {
        httpModule.getJSON(fullUrl).then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
}
