 const tasks = getTasks()
 const divTask = document.getElementById("task-list")
 const newTaskInput = document.getElementById("new-task")

 class Task {
     constructor(name){
         let now = Date.now()
         this.name = name
         this.id = `task-${now}`  
     }
 }

 function createElement(task) {
     let label = document.createElement("label")
     label.id = task.id
     let input = document.createElement("input")
     input.onclick = removeTask
     input.type = "checkbox"
     let span = document.createElement("span")
     span.innerHTML = task.name
     
     label.appendChild(input)
     label.appendChild(span)
     divTask.appendChild(label)
 }

 function loadTasks() {
     for (let task of tasks) {
         createElement(task)
     }
 }

 function addTask() {
     let name = newTaskInput.value
     let task = new Task(name)
     tasks.push(task)
     storeTasks()
     createElement(task)
 }

 function storeTasks() {
     let stringified = JSON.stringify(tasks)
     localStorage.setItem("tasks",stringified)
 }

 function getTasks() {
     let stringified = localStorage.getItem("tasks")
     if (stringified == null) {
         return []
    }
    return JSON.parse(stringified)
 }

 function removeTask(event) {
    let input = event.srcElement
    let label = input.parentElement
    let id = label.id
    divTask.removeChild(label)

    for (let i = 0; i < tasks.length; i += 1){
        let task = tasks[i]
        if (task.id == id) {
            tasks.splice(i, 1)
            break
        }
    }
    storeTasks()
 }