const title = document.getElementById('todo_title');
const description = document.getElementById('todo_description');
const submit_todo = document.getElementById('submit_todo');

let todos = [];

submit_todo.onclick = function () {
  const todo = {
    title_name: title.value,
    description_body: description.value,
  };  

  title.value = '';
  description.value = '';

  todos.push(todo);

  saveTodos();
  messageTodos();
  submit_todo.setAttribute('disabled', true);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos) || []);
}

function examinationLocalStorage () {
if(localStorage.getItem('todos')) todos = JSON.parse(localStorage.getItem('todos'));
  messageTodos();
}

function messageTodos() {
  const todos_container = document.querySelector('.main-wrapper__todos');  
  todos_container.innerHTML = '';
  todos.forEach(function(item) {
    let out = '';
    out += `<p>${item.title_name}</p>`
    out += `<p>${item.description_body}</p>`

    let deleteButton = document.createElement("button"); 

    deleteButton.innerHTML = " x ";
    const todoWrapper = document.createElement('div');
    todoWrapper.innerHTML = out;
    todoWrapper.append(deleteButton);
    todos_container.append(todoWrapper);
    
    deleteButton.onclick = () => {
      const index = todos.indexOf(item);
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos) || []);
      todoWrapper.remove();
    };             
  })
}

const getInputs = () => {
  if (title.value.length > 0 && description.value.length > 0) {
    submit_todo.removeAttribute('disabled');
  } else {
    submit_todo.setAttribute('disabled', true);
  }
}

title.oninput = () => {
  getInputs();
}

description.oninput = () => {
  getInputs();
}

examinationLocalStorage();
