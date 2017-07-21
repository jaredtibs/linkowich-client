const {ipcRenderer, shell} = require('electron')

document.addEventListener('click', (event) => {
  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault()
  } else if (event.target.classList.contains('js-refresh-action')) {
    updateLinks()
  } else if (event.target.classList.contains('js-add-subscription-action')) {
    addSubscription()
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close()
  }
})

function addSubscription() {
  alert("adding subscription!")
}

function getLinks() {
  return fetch('http://localhost:3000/api/v1/links')
    .then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json)
    }).catch(err => {
      updateErrorStateView()
    })
  })
}

function updateLinks() {
  getLinks().then((links) => {
    if (links.meta.count === 0) {
      updateEmptyStateView()
    } else {
      ipcRenderer.send('links-updated', links.data)
      updateView(links.data)
    }
  }).catch(err => {
    updateErrorStateView()
  });
}

function updateView(links) {
  document.querySelector('.js-summary').textContent = "Your Subscriptions"
  let container = document.getElementById('links-container')
  let html = ""

  links.forEach(function(link) {
    html += generateLinkHtml(link)
  })

  container.innerHTML = html
}

function updateErrorStateView() {
  let container = document.getElementById('links-container')
  let html = "<div class='padded-horizontally emptyContainer'><p> oops something went wrong </p></div>"
  container.innerHTML = html
}

function updateEmptyStateView() {
  document.querySelector('.js-summary').textContent = "Your Subscriptions"
  let container = document.getElementById('links-container')
  let html = "<div class='padded-horizontally emptyContainer'>Follow your friends and their links will appear here</div>"
  container.innerHTML = html
}

function generateLinkHtml(link) {
  let url = link.attributes.url
  let user = link.attributes.user.data.attributes
  let avatar = user.avatar.url || "./assets/default_avatar.jpeg"

  let html = "<div class='link-row padded-horizontally'>"
  html += "<img class='img-circle media-object pull-left' src=" + avatar + " width='32' heigh='32'>"
  html += "<div class='username'>" + user.username + "</div>"
  html += "<div class='link-container'>"
  html += "<a href=" + url + ">" + url + "</a>"
  html += "</div></div>"
  return html
}

//you'll probably want to add a new endpoint that checks for only unread links
//and appends that link in and hits the main process to trigger the notification

// Refresh links every minute
const oneMinute = 60 * 1000
setInterval(updateLinks, oneMinute)

// Update links when loaded
document.addEventListener('DOMContentLoaded', updateLinks)
