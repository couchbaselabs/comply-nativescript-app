var frameModule = require("ui/frame");
var observableArrayModule = require("data/observable-array");
var authManager = require("../../authmanager");
var utilityModule = require("../../utility");

exports.pageLoaded = function(args) {
    var page = args.object;
    if(!authManager.isAuthenticated()) {
        frameModule.topmost().navigate({moduleName: "views/auth/auth", clearHistory: true});
    }
    var projects = new observableArrayModule.ObservableArray([]);
    utilityModule.makeGetRequest("http://192.168.57.1:3000/api/project/getAll", [authManager.getAuthToken()]).then((result) => {
        for(var i = 0; i < result.length; i++) {
            projects.push(result[i]);
        }
    }, (error) => {
        console.log(error);
    });
    page.bindingContext = {projects: projects};
}

exports.navigateToTasks = function(args) {
    frameModule.topmost().navigate({moduleName: "views/tasks/tasks", context: {projectId: args.object.bindingContext.projects.getItem(args.index)._id}});
}

exports.logout = function() {
    authManager.logout();
    frameModule.topmost().navigate({moduleName: "views/auth/auth", clearHistory: true});
}
