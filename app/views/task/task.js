var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var observableModule = require("data/observable");

var taskId;

exports.pageLoaded = function(args) {
    var page = args.object;
    taskId = page.navigationContext.taskId;
    var task = new observableModule.Observable();
    getTask().then((result) => {
        task.set("name", result.task.name);
        task.set("description", result.task.description);
        task.set("history", result.task.history);
    }, (error) => {
        console.log(error);
    });
    page.bindingContext = {task: task};
}

getTask = function() {
    return new Promise((resolve, reject) => {
        fetchModule.fetch("http://192.168.57.1:3000/api/task/get/" + taskId, {
            method: "GET"
        })
        .then(function(response) {
            resolve(response.json());
        }, function(error) {
            reject(error.json());
        });
    });
}
