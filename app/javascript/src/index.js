import $, { post } from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
  markComplete,
  markActive,
} from "./requests.js";

window.addEventListener("load", () => {
  console.log("page is fully loaded");

  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      return "<div class='col-6 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
        " + task.content + "</div> \
        <input type='checkbox' class='mark-complete col-2' data-id='" + task.id + "'" + (task.completed ? 'checked' : '') + "> \
        <button class='delete btn btn-danger col-4' data-id='" + task.id + "'>Delete \
        </button>";
    });

    $("#tasks").html(htmlString);
  });

  $("#new-task").on("submit", function (e) {
    e.preventDefault();

    var content = $("#task-content").val();

    postTask(content, function (response) {
      var htmlString = "<div class='col-6 mb-3 p-2 border rounded task' data-id='" + response.task.id + "'> \
        " + response.task.content + "</div> \
        <input type='checkbox' class='mark-complete col-2' data-id='" + response.task.id + "'" + (response.task.completed ? 'checked' : '') + "> \
        <button class='delete btn btn-danger col-4' data-id='" + response.task.id + "'>Delete \
        </button>";

      $("#tasks").append(htmlString);
      $("#task-content").val("");
    });
  });

  $(document).on("click", ".delete", function () {
    var id = $(this).data("id");

    deleteTask(id, function (response) {
      $(".task[data-id=" + id + "]").remove();
      $(".mark-complete[data-id=" + id + "]").remove();
      $(".delete[data-id=" + id + "]").remove();
    });
  });

  $(document).on("click", ".mark-complete", function () {
    var id = $(this).data("id");

    if ($(this).is(":checked")) {
      markComplete(id, function (response) {
        $(".task[data-id=" + id + "]").addClass("completed");
      });
    } else {
      markActive(id, function (response) {
        $(".task[data-id=" + id + "]").removeClass("completed");
      });
    }
  });

  $(document).on("click", "#sort-all", function () {
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function(task) {
        return "<div class='col-6 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
          " + task.content + "</div> \
          <input type='checkbox' class='mark-complete col-2' data-id='" + task.id + "'" + (task.completed ? 'checked' : '') + "> \
          <button class='delete btn btn-danger col-4' data-id='" + task.id + "'>Delete \
          </button>";
      });

      $("#tasks").html(htmlString);
    });
  });

  $(document).on("click", "#sort-active", function () {
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function(task) {
        if (!task.completed) {
          return "<div class='col-6 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
            " + task.content + "</div> \
            <input type='checkbox' class='mark-complete col-2' data-id='" + task.id + "'" + (task.completed ? 'checked' : '') + "> \
            <button class='delete btn btn-danger col-4' data-id='" + task.id + "'>Delete \
            </button>";
        }
      });

      $("#tasks").html(htmlString);
    });
  });

  $(document).on("click", "#sort-completed", function () {
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function(task) {
        if (task.completed) {
          return "<div class='col-6 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
            " + task.content + "</div> \
            <input type='checkbox' class='mark-complete col-2' data-id='" + task.id + "'" + (task.completed ? 'checked' : '') + "> \
            <button class='delete btn btn-danger col-4' data-id='" + task.id + "'>Delete \
            </button>";
        }
      });

      $("#tasks").html(htmlString);
    });
  });
});