import io from "socket.io-client";

const socket = io("/snake");

export default socket;
