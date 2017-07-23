const {ipcRenderer, shell} = require('electron')

document.addEventListener('submit', (event) => {
  event.preventDefault();
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  loginUser(email, password).then((userData) => {
    ipcRenderer.send('login-success', userData)
  }).catch(err => {
    console.error(err)
  })
})

function loginUser(email, password) {
  let body = { email: email, password: password  }

  return fetch('http://localhost:3000/api/v1/sessions', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json)
    })
  })
}
