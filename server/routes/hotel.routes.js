const HotelController = require('../controllers/hotel.controller')

module.exports = app => {
    app.get('/api/allListings', HotelController.getAllHotels)
    app.get('/api/hotel/:id', HotelController.getOneHotel)
    app.get('/api/hotel/rooms/:id', HotelController.getHotelRooms)
    app.get('/api/countByCity', HotelController.countByCity)
    app.post('/api/newHotel', HotelController.newHotel)
    app.patch('/api/editHotel/:id', HotelController.editHotel)
    app.delete('/api/deleteHotel/:id', HotelController.deleteHotel)
}