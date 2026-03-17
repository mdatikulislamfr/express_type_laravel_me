
const ioSystems = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected");
        // public match update
        // disconnect
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
    // ------------------GLOBAL EVENT-----------------------
    
}
module.exports = ioSystems;