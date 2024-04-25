const RoomController = require('../controllers/room.controller')
const { verifyAdmin } = require('../config/jwt.config')

module.exports = app => {
    app.get('/api/rooms', RoomController.getAllRooms)
    app.get('/api/room/:id', RoomController.getOneRoom)
    app.get('/api/bookRoom/:id/:userId', RoomController.bookRoom)
    app.post('/api/newRoom/:hotelId', /* verifyAdmin, */ RoomController.newRoom)
    app.patch('/api/editRoom/:id', RoomController.editRoom)
    app.put('/api/roomAvailability/:id', RoomController.roomAvailability)
    app.delete('/api/deleteRoom/:id/:hotelId', RoomController.deleteRoom)
}