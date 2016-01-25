var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var observableModule = require("data/observable");

var projectId;

exports.pageLoaded = function(args) {
    var page = args.object;
    var project = new observableModule.Observable();
    getProject(page.navigationContext.projectId).then((result) => {
        project.set("name", result.name);
        project.set("tasks", result.tasks);
    }, (error) => {
        console.log(error);
    });
    page.bindingContext = {project: project};
}

exports.navigateToTask = function(args) {
    frameModule.topmost().navigate({moduleName: "views/task/task", context: {taskId: args.object.bindingContext.project.tasks[args.index]._id}});
}

getProject = function(projectId) {
    return new Promise((resolve, reject) => {
        fetchModule.fetch("http://192.168.57.1:3000/api/project/get/" + projectId, {
            method: "GET"
        })
        .then(function(response) {
            resolve(response.json());
        }, function(error) {
            reject(error.json());
        });
    });
}
