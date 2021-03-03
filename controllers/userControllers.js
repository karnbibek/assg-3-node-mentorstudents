const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    // console.log('1',req.user);
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
};

exports.createUser = (req, res, next) => {
    // console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;

    if (!firstName || !lastName || !email || !phone) {
        return res.status(422).json({ message: "Please enter all fields correctly!!" });
    }

    User.create({ firstName: firstName, lastName, email, phone })
        .then(user => {
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

exports.editUser = (req, res, next) => {
    console.log(req.body);
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;

    if (!id) {
        return res.status(422).json({ message: "Please select a user to see the details!!" })
    }

    if (!firstName || !email || !phone) {
        return res.status(422).json({ message: "Please enter all fields correctly!!" });
    }

    User.findByPk(id)
        .then(user => {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phone = phone;

            user.save();
            res.status(200).json({ message: "user updated successfully!", user: user });
        })
        .catch(err => console.log(err));
}

exports.deleteUser = (req, res, next) => {
    // console.log(req.body);
    const id = req.body.id;
    
    if (!id) {
        return res.status(422).json({ message: "Please select a user to delete!!" });
    }

    User.findByPk(id)
        .then(user => {
            user.destroy();
            res.status(200).json({message: "User deleted successfully!"});
        })
        .catch(err => console.log(err));
}
