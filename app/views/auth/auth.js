var frameModule = require("ui/frame");
var httpModule = require("http");
var observableArrayModule = require("data/observable-array");
var authManager = require("../../authmanager");

var email;
var password;

exports.pageLoaded = function(args) {
    var page = args.object;
    if(authManager.isAuthenticated()) {
        frameModule.topmost().navigate({moduleName: "views/projects/projects", clearHistory: true});
    }
    email = page.getViewById("email");
    password = page.getViewById("password");
    page.bindingContext = {};
}

exports.login = function() {
    console.log(email.text + " " + password.text);
    if(email.text != "" && password.text != "") {
        authManager.login(email.text, password.text).then(function(result) {
            frameModule.topmost().navigate({moduleName: "views/projects/projects", clearHistory: true});
        }, function(error) {
            console.log(error);
        });
    }
}
