import $, { post } from 'jquery';

import {
  indexTasks,
  postTask,
} from "./requests.js";

indexTasks(function (response) {
  var htmlString = response.tasks.map(function(task) {
    return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
      " + task.content + "\
      </div>";
  });

  $("#tasks").html(htmlString);
});

$("#new-task").on("submit", function (e) {
  e.preventDefault();

  var content = $("#task-content").val();

  postTask(content, function (response) {
    console.log(response);
  });
});