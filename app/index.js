const {ipcRenderer, shell} = require('electron')
const submitLinkForm = document.getElementById('submitLinkForm');

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

function submitLink(event) {
  alert("submitting link!")
}

function updateLinks() {
 // fetch to api here to get list of links
  links = []
  // this communicates to the main process
  // which can do things like display an icon with a nofitication by adjusting the tray (possible do different color for when a link has been updated, see weather example
  ipcRenderer.send('links-updated', links)
  updateView(links)
  //sendNotification(links)
}

function updateView(links) {
  document.querySelector('.js-summary').textContent = "Your Friends' Links"
}

// Update links when loaded
document.addEventListener('DOMContentLoaded', updateLinks)
