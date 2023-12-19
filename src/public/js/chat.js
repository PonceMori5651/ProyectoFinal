const socket = io()
//console.log(socket)
const messageContainer = document.getElementById('messageContainer')
const messageInput = document.getElementById('messageInput')
const messageButton = document.getElementById('messageButton')
const notificationContainer = document.getElementById('notificationContainer')

const {user} = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  })

socket.emit('joinChat',user)

socket.on('newUser',user=>{
    notificationContainer.innerHTML =user
})

messageButton.addEventListener('click',(e)=>{
  const message = messageInput.value
  const timeStamp = new Date().toLocaleTimeString()
  if(message){
    socket.emit('newMessage',JSON.stringify({message,user,timeStamp}))
    messageInput.value = ''
  }
})

socket.on('messages',messageString =>{
  const messageObj = JSON.parse(messageString)
  console.log(messageObj.timeStamp)
  messageContainer.innerHTML += `
    <div>${messageObj.user}: ${messageObj.message}-------------${messageObj.timeStamp}</div>
  `
})

socket.on('messagesAnt',messagesString=>{
  const messagesArray = JSON.parse(messagesString)
  messageContainer.innerHTML = ''
  messagesArray.forEach(message => {
    messageContainer.innerHTML += `
    <div>${message.user}: ${message.message}-------------${message.timeStamp}</div>
  `
  })
})