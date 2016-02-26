var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var utilityModule = require("../../utility");

var taskId;

exports.pageLoaded = function(args) {
    var page = args.object;
    taskId = page.navigationContext.taskId;
    var task = new observableModule.Observable({});
    utilityModule.makeGetRequest("http://192.168.57.1:3000/api/task/get", [taskId]).then((result) => {
        task.set("name", result.task.name);
        task.set("description", result.task.description);
        task.set("history", result.task.history);
    }, (error) => {
        console.log(error);
    });
    page.bindingContext = {task: task};
}

exports.comment = function() {
    frameModule.topmost().navigate({moduleName: "views/log/log", context: {taskId: taskId}});
}
