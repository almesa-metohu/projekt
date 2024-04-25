const Hotel = require('../models/hotel.model')
const Room = require('../models/room.model')

module.exports = {
    newHotel: (req, res) => {
        Hotel.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    },

    getAllHotels: (req, res) => {
        const { min, max, ...others } = req.query;
        Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 }
        }).limit(parseInt(req.query.limit))
        .populate('rooms')
        .then(hotel => res.json(hotel))
        .catch(err => res.json(err))
    },

    getOneHotel: (req, res) => {
        Hotel.findOne({_id: req.params.id})
        .populate('rooms')
        .then(hotel => {
            if(!hotel) {
                return res.status(400).json({error: "Property not found"})
            }
            else{
                res.json(hotel)
            }
        })
        .catch(err => res.json(err))
    },

    editHotel: (req, res) => {
        Hotel.findOne({_id: req.params.id})
            .then(hotel => {
                if(!hotel) {
                    return res.status(400).json({error: "Property not found"})
                }
                hotel.name = req.body.name,
                hotel.city = req.body.city,
                hotel.country = req.body.country,
                hotel.address = req.body.address
                hotel.distance = req.body.distance
                hotel.description = req.body.description
                hotel.cheapestPrice = req.body.cheapestPrice
                return hotel.save()
            })
            .then(hotel => res.json(hotel))
            .catch(err => res.status(500).json({error: err.errors}))
    },
    
    deleteHotel: (req, res) => {
        Hotel.deleteOne({_id: req.params.id})
            .then(deletedHotel => res.json(deletedHotel))
            .catch(err => res.json(err))
    },

    countByCity: (req, res) => {
        const cities = req.query.cities.split(',')
        Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city }).exec()
            })
        )
            .then((list) => {
                res.status(200).json(list)
            })
            .catch(err => res.json(err))
    },

    getHotelRooms: (req, res) => {
        Hotel.findOne({ _id: req.params.id })
            .then(hotel => {
                const roommPromises = hotel.rooms.map((room) => {
                    return Room.findById(room)
                })
                Promise.all(roommPromises)
                    .then(rooms => {
                        res.status(200).json(rooms)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: 'An error occurred' });
                    })
                })
                    .catch(err => console.log(err))
    },
}