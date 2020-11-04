const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea  = require('./checkMillionDollarIdea');

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.param('ideasId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(!idea) {
        res.status(404).send();
    } else {
        req.idea = idea;
        next();
    }
});

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
});

ideasRouter.post('/', (req, res, next) => {
    checkMillionDollarIdea(req, res, next);
    newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
    
});

ideasRouter.get('/:ideasId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideasId', (req, res, next) => {
    checkMillionDollarIdea(req, res, next);
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideasId', (req, res, next) => {
    const ideaToDelete = deleteFromDatabasebyId('ideas', req.idea.id);
    if(ideaToDelete) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

