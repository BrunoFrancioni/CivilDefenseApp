const http = require('http');
import app from "./app";
import { Server, Socket } from "socket.io";
import EventsController from "./controllers/eventsController";

const eventsController = new EventsController();

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000"
    }
});

io.on("connection", (socket: Socket) => {
    console.log("Client connected");

    socket.on("Create Event", async data => {
        const result = await eventsController.createEvent(data);

        if (!result.result) {
            io.sockets.emit("Result Create Event", {
                result: false,
                id: result.id
            });
        } else {
            io.sockets.emit("Result Create Event", {
                result: true,
                id: result.id
            });

            io.sockets.emit("New Event", {
                event: result.event,
                id: result.id
            });
        }
    });
});

server.listen(port, host, () => {
    console.log('Server is working');
});