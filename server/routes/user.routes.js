const UserController = require('../controllers/user.controller')
const { verifyUser, verifyAdmin } = require('../config/jwt.config')

module.exports = app => {
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    app.post('/api/logout', UserController.logout)
    app.post('/api/sendEmailReservation', UserController.sendEmailReservation)
    app.post('/api/subscriptionEmail', UserController.subscriptionEmail)
    app.get('/api/user/:id', UserController.getUser)
    app.get('/api/users', UserController.getUsers)
    app.patch('/api/user/:id', UserController.updateUser)
    app.delete('/api/user/:id', UserController.deleteUser)
}