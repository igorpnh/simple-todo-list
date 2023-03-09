const inputTodo = document.querySelector(".input-todo");
const addTodo = document.querySelector(".btn-todo");
const todoList = document.querySelector(".list-todo");

//CRIA A LI PARA SER INSERIDA DENTRO DO UL
function createLi() {
  const li = document.createElement("li");
  return li;
}

//ADICIONA A TAREFA A UL (LISTA)
function addTask(valueInput) {
  const li = createLi();
  li.innerHTML = valueInput;
  todoList.appendChild(li);
  clearInput();
  createDeleteButton(li);
  saveTasks();
}

//SALVA AS TAREFAS NO LOCAL STORAGE DO NAVEGADOR
function saveTasks() {
  const liTasks = todoList.querySelectorAll("li");
  const listTasks = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    //altera o texto Delete do botão para vazio e trim remove os espaços em branco.
    taskText = taskText.replace("Delete", "").trim();
    //joga a lista de tarefas para o array;
    listTasks.push(taskText);
  }

  //transforma o array de tarefas em uma "string" JSON
  const tasksJSON = JSON.stringify(listTasks);
  //seta no localStorage a string em JSON com o nome de tasks
  localStorage.setItem("tasks", tasksJSON);
}

//LER TAREFAS SALVAS NO LOCAL STORAGE PARA SEREM ADICIONADAS AO RECARREGAR PAG
function readSaveTasks() {
  //obtem os valores do localStorage
  const tasks = localStorage.getItem("tasks");
  //converte o JSON para um array novamente
  const listTasks = JSON.parse(tasks);

  for (let task of listTasks) {
    addTask(task);
  }
}
readSaveTasks();

//LIMPA O INPUT APÓS CRIAR A TAREFA E MANTÉM O FOCUS NO INPUT
function clearInput() {
  inputTodo.value = "";
  inputTodo.focus();
}

//CRIA O BOTÃO DE DELETAR JUNTO AO LI CRIADO
function createDeleteButton(li) {
  li.innerText += " ";
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  //seta o atributo class com o nome delete ao botão. (para que possa ser chamado pelo js)
  deleteButton.setAttribute("class", "delete");
  li.appendChild(deleteButton);
}

//-----------------------------------EVENTOS-----------------------------------
//capturando evento de click no botão
addTodo.addEventListener("click", function () {
  //caso retorne em falso (em branco retorna falso), não acontecerá nada
  if (!inputTodo.value) return;
  addTask(inputTodo.value);
});

inputTodo.addEventListener("keypress", function (e) {
  if (e.key !== "Enter") return;
  if (!inputTodo.value) return;
  addTask(inputTodo.value);
});

document.addEventListener("click", function (e) {
  const element = e.target;
  if (element.classList.contains("delete")) {
    element.parentElement.remove();
    saveTasks();
  }
});
