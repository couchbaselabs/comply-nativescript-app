var httpModule = require("http");

exports.makePostRequest = function(url, params, body) {
    var fullUrl = url;
    if(params && params.length > 0) {
        fullUrl = fullUrl + "/" + params.join("/");
    }
    return httpModule.request({
        url: fullUrl,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(body)
    });
}

exports.makeGetRequest = function(url, params) {
    var fullUrl = url;
    if(params && params.length > 0) {
        fullUrl = fullUrl + "/" + params.join("/");
    }
    return httpModule.getJSON(fullUrl);
}
