import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
  updateTask,
} from "./requests.js";

indexTasks(function (response) {
  var htmlString = response.tasks.map(function(task) {
    return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
      " + task.content + "\
      </div>";
  });

  $("#tasks").html(htmlString);
});

postTask(function (response) {
  var htmlString = "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + response.task.id + "'> \
    " + response.task.content + "\
    </div>";

  $("#tasks").append(htmlString);
});

deleteTask(function (response) {
  var id = response.task.id;
  $(".task[data-id=" + id + "]").remove();
});

updateTask(function (response) {
  var id = response.task.id;
  var completed = response.task.completed;
  $(".task[data-id=" + id + "]").toggleClass("completed", completed);
});