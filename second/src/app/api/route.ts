import { NextRequest, NextResponse } from "next/server";
import { Socket } from "socket.io";
const { Server } = require('socket.io');

const http = require('http');
const server = http.createServer((req: NextRequest, res: NextResponse) => {
  // Handle HTTP requests if needed
});


const io = new Server(server);

io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  
  // Handle chat messages
  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});