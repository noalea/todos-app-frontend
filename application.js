function getTasksUsingXHTTP() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const container = document.getElementById('container');
      const responses = JSON.parse(this.responseText);

      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        container.insertAdjacentHTML("beforeend", `<li>[${response.id}]: ${response.task}</li>`)
      }
    }
  }
  xhttp.open("GET", "http://localhost:3001/todos", true);
  xhttp.send();
}

function getTasksUsingFetch() {
  fetch('http://localhost:3001/todos')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const response = data[i];
      container.insertAdjacentHTML("beforeend", `<li>[${response.id}]: ${response.task}</li>`)
    }
  });
}

getTasksUsingFetch();
