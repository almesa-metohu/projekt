const Room = require("../models/room.model");
const Hotel = require("../models/hotel.model");
const User = require("../models/user.model");
require("dotenv").config();

module.exports = {
  newRoom: (req, res) => {
    const hotelId = req.params.hotelId;
    Room.create(req.body)
      .then((room) => {
        return Hotel.findByIdAndUpdate(
          hotelId,
          { $push: { rooms: room._id } },
          { new: true, runValidators: true }
        )
          .populate("rooms")
          .exec();
      })
      .then((updatedHotel) => {
        res.status(200).json({ message: "Room created", hotel: updatedHotel });
      })
      .catch((err) => {
        console.error("Failed to create or update hotel with room ID:", err);
        res.status(500).json(err);
      });
  },

  bookRoom: (req, res) => {
    Room.findOne({ _id: req.params.id })
      .then((room) => {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { "reservation.roomId": room._id } },
          { new: true, runValidators: true }
        )
          .populate("reservation")
          .then((updatedUser) => {
            res.status(200).json({ message: "Room booked", user: updatedUser });
          })
          .catch((err) => {
            console.log("Failed to update user with room id" + err);
            res.json(err);
          });
      })
      .catch((err) => {
        console.log("Failed to book a room" + err);
        res.json(err);
      });
  },

  getAllRooms: (req, res) => {
    Room.find()
      .then((room) => res.json(room))
      .catch((err) => res.json(err));
  },

  getOneRoom: (req, res) => {
    Room.findOne({ _id: req.params.id })
      .then((room) => {
        if (!room) {
          return res.status(400).json({ error: "room not found" });
        } else {
          res.json(room);
        }
      })
      .catch((err) => res.json(err));
  },

  editRoom: (req, res) => {
    Room.findOne({ _id: req.params.id })
      .then((room) => {
        if (!room) {
          return res.status(400).json({ error: "room not found" });
        }
        (room.roomType = req.body.roomType),
          (room.price = req.body.price),
          (room.capacity = req.body.capacity);
        room.roomNumbers = req.body.roomNumbers;
        return room.save();
      })
      .then((room) => res.json(room))
      .catch((err) => res.status(500).json({ error: err.errors }));
  },

  deleteRoom: (req, res) => {
    Room.deleteOne({ _id: req.params.id })
      .then((deletedRoom) => {
        Hotel.findOneAndUpdate(
          { _id: req.params.hotelId },
          { $pull: { rooms: req.params.id } },
          { new: true, runValidators: true }
        )
          .then(() => {
            res.status(200).json({ message: "Room deleted" });
          })
          .catch((err) => {
            console.log("Failed to update hotel with room id" + err);
            res.json(err);
          });
      })
      .catch((err) => {
        console.log("Failed to delete a room" + err);
        res.json(err);
      });
  },

  roomAvailability: (req, res) => {
    Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    )
      .then((room) => res.status(200).json(room))
      .catch((err) => console.log(err));
  },
};
