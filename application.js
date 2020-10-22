function getTasks() {
  fetch('http://localhost:3001/todos')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      addTodoToList(data[i]);
    }
  });
}

function sendForm(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById('todo_form'));
  fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      task: formData.get('todo[task]')
    })
  })
  .then(response => response.json())
  .then(data => addTodoToList(data));
}

function addTodoToList(response) {
  const container = document.getElementById('container');
  container.insertAdjacentHTML("beforeend", `<li>[${response.id}]: ${response.task}</li>`);
}

getTasks();
