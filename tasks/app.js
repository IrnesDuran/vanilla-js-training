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
}

//store task in local storage function
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasksk=[];
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

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //append li to ul
    taskList.appendChild(li);
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
        }
    }
}

//clear all tasks function
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

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