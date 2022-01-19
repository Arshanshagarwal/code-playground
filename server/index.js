const app = require('express')()
const http = require('http').createServer(app)
const port = process.env.PORT || 4000;
const io = require('socket.io')(http, {
    cors: {
        origin: ["https://code-playground-netlify.netlify.app"],
    },
})

let activeRooms = new Map()
io.on('connection', socket => {
    let currMem, currRoom;
    socket.on('editing-js', (js, room) => {
        socket.to(room).emit('new-js', js)
    })

    socket.on('editing-html', (html, room) => {
        socket.to(room).emit('new-html', html)
    })

    socket.on('editing-css', (css, room) => {
        socket.to(room).emit('new-css', css)
    })

    socket.on('member-connecting', (roomID, name, callback) => {
        const currRoomMembers = activeRooms.get(roomID);
        activeRooms.set(roomID, currRoomMembers + 1)
        socket.to(roomID).emit('member-connected', name, currRoomMembers + 1)
        callback({
            count: currRoomMembers + 1,
        })

        currMem = name;
        currRoom = roomID;
    })

    socket.on('trying-room', (room, name, callback) => {
        console.log(activeRooms)
        if (activeRooms.has(room) && activeRooms.get(room)) {
            callback({
                status: 'ok'
            })
        }
        else {
            callback({
                status: "error"
            })
        }
    })

    socket.on('creating-room', (room, socketID) => {
        if (room !== socketID && room !== '') {
            if (!activeRooms.has(room))
                activeRooms.set(room, 1)
            socket.join(room);
        }
    })

    socket.on('leaving-room', room => {
        if (room) {
            activeRooms.delete(room)
            socket.leave(room);
        }
    })

    socket.on('disconnecting', () => {
        const currRoomMembers = activeRooms.get(currRoom)
        activeRooms.set(currRoom, currRoomMembers - 1)
        socket.to(currRoom).emit('member-disconnected', currMem, currRoomMembers - 1)
    });
})

http.listen(port, () => console.log(`Server Running on port ${port}`))