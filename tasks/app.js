// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//function for load all event listeners
function loadEventListeners(){
    //add task event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter through the tasks
    filter.addEventListener('keyup', filterTasks);
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
}

//get DOM tasks from local storage
function getTasks () {
    let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks=[];
     } else {
        tasks = JSON.parse (localStorage.getItem('tasks'));
     }

     tasks.forEach(function (task) {
        //create li element
        const li = document.createElement('li');
        li.className ='collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create font awesome link for icon
        const link = document.createElement('a');
        link.className='delete-item secondary-content';
        // add icon html
        link.innerHTML ='<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

     });
};

//store task in local storage function
function storeTaskInLocalStorage(task) {
    let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks=[];
     } else {
        tasks = JSON.parse (localStorage.getItem('tasks'));
     }

     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));
 };

function addTask (e) {
    if(taskInput.value===''){
       alert('Add a task');
    }else{

    //create li element
    const li = document.createElement('li');
    li.className ='collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create font awesome link for icon
    const link = document.createElement('a');
    link.className='delete-item secondary-content';
    // add icon html
    link.innerHTML ='<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value='';
    }


    e.preventDefault();
};



//remove task function
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm ('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove task from the local storage as well
            removeTaskFromLocalStorage (e.target.parentElement.parentElement);

        }
    }
}

//funct for removing tasks from local storage
function removeTaskFromLocalStorage (targetedItem){

    let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks=[];
     } else {
        tasks = JSON.parse (localStorage.getItem('tasks'));
     }

     tasks.forEach(function (task, index) {
        if(targetedItem.textContent ===  task) {
            tasks.splice (index, 1);
        }
     });
     localStorage.setItem('tasks', JSON.stringify(tasks));
};

//clear all tasks function
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear local storage tasks as well
    clearTasksFromLocalStorage();
}

//Clear all tasks from local storage
function clearTasksFromLocalStorage (){
    localStorage.clear();
};

//filter tasks
function filterTasks(e) {
    const text  = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        } else {
            task.style.display='none';
        }
    });
}