var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var utilityModule = require("../../utility");

var projectId;

exports.pageLoaded = function(args) {
    var page = args.object;
    var project = new observableModule.Observable();
    utilityModule.makeGetRequest("http://192.168.57.1:3000/api/project/get", [page.navigationContext.projectId]).then((result) => {
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
