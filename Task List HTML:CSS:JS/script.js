window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listEl = document.querySelector("#tasks");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;

    //local Storage
    let tasks = [];
    let tasksSaved = window.localStorage.setItem("tasks", JSON.stringify(task));
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    if (tasksFromLocalStorage) {
      tasks += tasksFromLocalStorage;
    }

    if (!task) {
      alert("Please fill out the task");
      return;
    }
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContentEl = document.createElement("div");
    taskContentEl.classList.add("content");

    taskEl.appendChild(taskContentEl);
    const taskInputEt = document.createElement("input");
    taskInputEt.classList.add("text");
    taskInputEt.type = "text";
    taskInputEt.value = task;
    taskInputEt.setAttribute("readonly", "readonly");

    taskContentEl.appendChild(taskInputEt);

    const taskActionsEl = document.createElement("div");
    taskActionsEl.classList.add("actions");

    const taskEditEl = document.createElement("button");
    taskEditEl.classList.add("edit");
    taskEditEl.innerHTML = "Edit";

    const taskDeleteEl = document.createElement("button");
    taskDeleteEl.classList.add("delete");
    taskDeleteEl.innerHTML = "Delete";

    taskDeleteEl.addEventListener("click", () => {
      localStorage.clear();
    });

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);

    taskEl.appendChild(taskActionsEl);
    listEl.appendChild(taskEl);

    input.value = "";

    taskEditEl.addEventListener("click", () => {
      if (taskEditEl.innerText.toLocaleLowerCase() == "edit") {
        taskInputEt.removeAttribute("readonly");
        taskInputEt.focus();
        taskEditEl.innerText = "Save";
      } else {
        taskInputEt.setAttribute("readonly", "readonly");
        taskEditEl.innerText = "Edit";
      }
    });

    taskDeleteEl.addEventListener("click", () => {
      listEl.removeChild(taskEl);
    });
  });
});
