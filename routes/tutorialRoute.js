module.exports = app => {
    const tutorial = require("../controllers/tutorial.js");
    let router = require('express').Router();

    router.get('/',tutorial.findAll);
    router.get('/published',tutorial.findAllPublisher);
    router.get('/:id',tutorial.findOne);
    router.post('/',tutorial.create);
    router.put('/:id',tutorial.update);
    router.delete('/:id',tutorial.delete);
    router.delete('/',tutorial.deleteAll);

    app.use('/api/tutorials', router);
};