var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var utilityModule = require("../../utility");

var page;
var projectId;

exports.pageLoaded = function(args) {
    page = args.object;
    projectId = page.navigationContext.projectId;
    var project = new observableModule.Observable({});
    utilityModule.makeGetRequest("http://192.168.57.1:3000/api/project/get", [projectId]).then((result) => {
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
