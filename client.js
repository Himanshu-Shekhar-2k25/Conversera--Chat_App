const socket = io('http://127.0.0.1:8000');

const form = document.getElementById('entry');
const msgInp = document.getElementById('Message_Data')
const messageContainer = document.querySelector('.ChatBox')

var audio = new Audio('audioFile.wav')

function append(message, positionClass)
{
    const msgElement = document.createElement('div')
    msgElement.innerText = message;
    msgElement.classList.add('common')
    msgElement.classList.add(positionClass)
    messageContainer.append(msgElement)
    audio.play()
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = msgInp.value;
    append(`You: ${message}`,'sendMessage')
    socket.emit('sendMessage',message);
    msgInp.value = '';
})

const uname = prompt("Enter your name to join the chat");
socket.emit("userJoin",uname);

socket.on('newUserMsg',function(data)
{
    append(data,"Join_Leave_Msg")
});

socket.on('receiveMsg',function(data)
{
    append(`${data.name}: ${data.message}`,'receiveMessage')
}); 


socket.on('left', function(name)
{
    append(name,"Join_Leave_Msg")
});
