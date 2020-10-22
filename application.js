function getTasks() {
  fetch('http://localhost:3001/todos')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      addTask(data[i]);
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
  .then(data => addTask(data));

  document.getElementById('task_input').value = '';
}

function addTask(response) {
  const container = document.getElementById('container');
  container.insertAdjacentHTML(
    'beforeend',
    `<li class="task" id="${response.id}" onclick="deleteTask('${response.id}')">[${response.id}]: ${response.task}</li>`
  );
}

function deleteTask(responseId) {
  fetch(`http://localhost:3001/todos/${responseId}`, {
    method: 'DELETE',
  })
  .then(response => response.text())
  .then(document.getElementById(responseId).remove());
}

getTasks();
