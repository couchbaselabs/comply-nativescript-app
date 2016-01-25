var applicationSettings = require("application-settings");

exports.isAuthenticated = function() {
    if(applicationSettings.getString("user", "") != "") {
        return true;
    } else {
        return false;
    }
}

exports.getAuthToken = function() {
    if(applicationSettings.getString("user", "") != "") {
        return JSON.parse(applicationSettings.getString("user", ""))._id;
    } else {
        return null;
    }
}

exports.login = function(email, password) {
    return new Promise(function(resolve, reject) {
        httpModule.getJSON("http://192.168.57.1:3000/api/user/login/" + email + "/" + password).then(function(response) {
            if(!response.hasOwnProperty("status")) {
                applicationSettings.setString("user", JSON.stringify(response));
                resolve(response);
            } else {
                reject("User not found");
            }
        }, function(error) {
            reject(error);
        });
    });
}

exports.logout = function() {
    applicationSettings.remove("user");
}
