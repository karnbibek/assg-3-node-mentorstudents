const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');

// databases
const sequelize = require('./util/sqlDatabase');
const mongoose = require('./util/nosqlDatabase');

const app = express();

const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: false }));

const companiesRoutes = require('./routes/companiesRoutes');
app.use('/companies', companiesRoutes);

app.use((req, res, next) => {
    // console.log(req);
    User.findAll()
        .then(users => {
            req.users = users;
            next();
        })
        .catch(err => console.log(err));
});

app.use(userRoutes);

sequelize
    // .sync({ force: true }) // not used in production
    .sync()
    .then(result => {
        return User.findAll();
    })
    .then(user => {
        // console.log(user[0].dataValues);
        if (!user) {
            // return res.status(404).json({message: "No users found!!"});
            return "No users found!!";
        }
        // return res.status(200).json({users: user});
        return user;
    })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });


mongoose.once("open", () =>
    console.log("mongoDB connection established successfully")
);