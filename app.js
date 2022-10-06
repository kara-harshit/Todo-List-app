// selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');


// event listener
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck)
// filterOption.addEventListener('click',filterTodo);


// functions
function addTodo(event){
    event.preventDefault();
    // todo div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    // create li
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // check button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    todoInput.value="";
}

function deleteCheck(e){
    const item=e.target;
    // delete the to-do
    if(item.classList[0]==="trash-btn")
    {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend',function(){
            item.parentElement.remove();
        });
        
    }
    if(item.classList[0]==="complete-btn")
    {
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value)
        {
            case "all":
                todo.style.display="block";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="block";
                }else
                {
                    todo.style.display="none";
                }
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    // todo div
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function getTodos()
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv=document.createElement('div');
        todoDiv.classList.add("todo");
        // create li
        const newTodo=document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // check button
        const completedButton=document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // trash button
        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // append to list
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }   

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}