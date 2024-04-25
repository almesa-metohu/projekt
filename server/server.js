const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socket = require("socket.io");
require("./config/mongoose.config");
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
require("./routes/hotel.routes")(app);
require("./routes/room.routes")(app);
require("./routes/user.routes")(app);
/* require('./routes/rating.routes')(app)
 */
const server = app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("toServer", (data) => {
    io.emit("toClient", data);
  });
  socket.on("disconnected", () => {
    console.log("Client disconnected");
  });
});
