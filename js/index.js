var deleteTaskButton = $(".delete-task");
const sortButton = $(".list-sort button");
var task = $("ul li a");
const taskCount = $(".list-footer p");
const taskList = $("ul");
const taskInput = $("main .add-item input");
const themeButton = $("header button");

function ChangeTheme() {
    if (themeButton.hasClass("dark")) {
        themeButton.removeClass("dark").addClass("light");
        $("body").removeClass("dark").addClass("light");
        $("main").removeClass("dark").addClass("light");
    }
    else {
        themeButton.removeClass("light").addClass("dark");
        $("body").removeClass("light").addClass("dark");
        $("main").removeClass("light").addClass("dark");
    }
}

function CountActiveTask() {
    var count = 0;
    task = $("ul li a");
    for (let i = 0; i < task.length; i++) {
        if (task.eq(i).hasClass("active")) {
            count++;
        }
    }
    taskCount.text(count + " items left");
}

function ChosenTask(a) {
    if (a.hasClass("active")) {
        a.removeClass("active").addClass("completed");
    }
    else {
        a.removeClass("completed").addClass("active");
    }
}

function AddTask(event) {
    const taskHTML = "" + 
    "<li>" +
    "  <a class='active' href='#'>" + 
    "    <button class='check' type='button'></button>" +
    "    <p class='task'>" + taskInput.val() + "</p>" +
    "    <button class='delete-task' type='button'></button>" +
    "  </a>" +
    "</li>";
    if (event.which == 13) {
        taskList.html(taskList.html() + taskHTML);
        task = $("ul li a");
        deleteTaskButton = $(".delete-task");
    }

    task.click(function(event) {
        event.preventDefault();
        ChosenTask($(this));
        CountActiveTask();
    });

    deleteTaskButton.click(function() {
        $(this).closest("li").remove();
        CountActiveTask();
    })

    CountActiveTask();
}

function GetAllTask() {
    sortButton.removeClass("chosen");
    $(".all-task").addClass("chosen");
    for (let i = 0; i < task.length; i++) {
        task.eq(i).closest("li").show();
    }
    task = $("ul li a");
}

function SortActiveTask() {
    sortButton.removeClass("chosen");
    $(".active-task").addClass("chosen");
    for (let i = 0; i < task.length; i++) {
        if (task.eq(i).hasClass("active") == false) {
            task.eq(i).closest("li").hide();
        }
        else {
            task.eq(i).closest("li").show();
        }
    }
}

function SortCompletedTask() {
    sortButton.removeClass("chosen");
    $(".completed-task").addClass("chosen");
    for (let i = 0; i < task.length; i++) {
        if (task.eq(i).hasClass("completed") == false) {
            task.eq(i).closest("li").hide();
        }
        else {
            task.eq(i).closest("li").show();
        }
    }
}

function DeleteCompleteTask() {
    for (let i = 0; i < task.length; i++) {
        if (task.eq(i).hasClass("completed")) {
            task.eq(i).closest("li").remove();
        }
    }
}

CountActiveTask();

taskInput.keypress(AddTask);

task.click(function(event) {
    event.preventDefault();
    ChosenTask($(this));
    CountActiveTask();
});

deleteTaskButton.click(function() {
    $(this).closest("li").remove();
    CountActiveTask();
});

taskList.sortable();