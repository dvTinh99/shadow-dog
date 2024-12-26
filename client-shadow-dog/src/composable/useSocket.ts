import { io } from "socket.io-client";

export const socket = io("ws://localhost:8888");

export function watchEvent(evenName : string, callBack : (data : any) => void) {
    socket.on(evenName, (data : any) => {
      callBack(data)
    })
}

export function emitEvent(evenName : string, data : any) {
  socket.emit('evenName' , data)
}