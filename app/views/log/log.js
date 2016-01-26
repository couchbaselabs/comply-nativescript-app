var frameModule = require("ui/frame");
var authManager = require("../../authmanager");
var utilityModule = require("../../utility");

var taskId;
var comment;

exports.pageLoaded = function(args) {
    var page = args.object;
    taskId = page.navigationContext.taskId;
    comment = page.getViewById("comment");
    page.bindingContext = {};
}

exports.save = function() {
    if(comment.text != "") {
        utilityModule.makePostRequest("http://192.168.57.1:3000/api/task/addHistory", [], {log: comment.text, userId: authManager.getAuthToken(), taskId: taskId}).then((result) => {
            frameModule.goBack();
        }, (error) => {
            console.error(error);
        });
    } else {
        alert({
            title: "Attention",
            message: "A comment is required",
            okButtonText: "Ok"
        });
    }
}
