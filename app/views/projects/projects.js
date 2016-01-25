var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var observableArrayModule = require("data/observable-array");
var applicationSettings = require("application-settings");
var authManager = require("../../authmanager");

exports.pageLoaded = function(args) {
    var page = args.object;
    if(!authManager.isAuthenticated()) {
        frameModule.topmost().navigate({moduleName: "views/auth/auth", clearHistory: true});
    }
    var projects = new observableArrayModule.ObservableArray();
    getProjects().then((result) => {
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

getProjects = function() {
    return new Promise((resolve, reject) => {
        fetchModule.fetch("http://192.168.57.1:3000/api/project/getAll/" + authManager.getAuthToken(), {
            method: "GET"
        })
        .then(function(response) {
            resolve(response.json());
        }, function(error) {
            reject(error.json());
        });
    });
}
