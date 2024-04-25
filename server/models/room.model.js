const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: [true, 'This field is required'],
    },
    price: {
        type: Number,
        required: [true, 'This field is required'],
        min: 1
    },
    capacity: {
        type: Number,
        required: [true, 'This field is required'],
        min: 1
    },
    roomNumbers: [
        {
            number: Number,
            unavailableDates: {type: [Date]}
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Room', RoomSchema)