const io = require('socket.io')(8000);
const users = {};

io.on('connection',function(socket)
{
    socket.on("userJoin", function(name)
    {
        users[socket.id] = name;
        socket.broadcast.emit("newUserMsg", name+" joined the chat");
    });

    socket.on("sendMessage", function(data)
    {
        socket.broadcast.emit("receiveMsg",{message : data, name:users[socket.id]})
    });

    socket.on('disconnect', function(name)
    {
        socket.broadcast.emit("left",users[socket.id] + " left the chat");
        delete users[socket.id];
    })
});