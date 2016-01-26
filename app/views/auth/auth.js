var frameModule = require("ui/frame");
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
    if(email.text != "" && password.text != "") {
        authManager.login(email.text.toLowerCase(), password.text).then(function(result) {
            frameModule.topmost().navigate({moduleName: "views/projects/projects", clearHistory: true});
        }, function(error) {
            alert({
                title: "Attention",
                message: error,
                okButtonText: "Ok"
            });
        });
    } else {
        alert({
            title: "Attention",
            message: "The email address or password is incorrect",
            okButtonText: "Ok"
        });
    }
}
