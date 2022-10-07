const db = require('../models');
const Tutorial = db.tutorial;
const Op = db.Sequelize.Op;

// Get all data
exports.findAll = async (req, res) => {
    const title = req.query.title;
    try {
        let condition = title ? { title : { [ Op.like ] : `%${title}%` } } : null;
        Tutorial.findAll({where: condition})
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while get all Tutorial."
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get all Tutorial."
        });
    }
};

// Get a data
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        Tutorial.findByPk(id)
            .then((data) => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Tutorial with id=${id}.`,
                        data: []
                    });
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while get a Tutorial."
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get a Tutorial."
        });
    }
};

// Create a new data
exports.create = async (req, res) => {
    try {
        // Validate request
        if(!req.body.title){
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // Create a data tutorial
        const tutorial = {
            title: req.body.title,
            description: (req.body.description?req.body.description:""),
            published: (req.body.published?req.body.published:false)
        }

        // Save data to DB
        Tutorial.create(tutorial)
            .then((data) => {
                res.send(data);
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial."
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial."
        });
    }
};

// Update a data by id
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const data = {
            title : req.body.title,
            description : req.body.description,
            published: req.body.published
        }
        Tutorial.update(data,{ where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Tutorial was updated successfully."
                      });
                } else {
                    res.send({
                        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                    });
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while update the Tutorial."
                });
            });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while update the Tutorial."
        });
    }
};

// Delete a data by id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        Tutorial.delete({ where: { id: id } })
            .then((data) => {
                if (data == 1) {
                    res.send({
                        message: "Data success deleted"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: `Could not delete Tutorial with id=${id}`
                });
            });
    } catch (err) {
        res.status(500).send({
            message: `Could not delete Tutorial with id=${id}`
        });
    }
};

// Delete all data
exports.deleteAll = async (req, res) => {
    try {
        Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then((nums) => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        }).catch((err) => {
            res.status(500).send({
                message: `Could not delete all Tutorial`
            });
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not delete all Tutorial`
        });
    }
};

// Get data publisher
exports.findAllPublisher = async (req, res) => {
    try {
        Tutorial.findAll({
            where: {published:true}
        })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    }
};