const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

const { 
    createMeeting,
    addToDatabase,
    getAllFromDatabase,
    deleteAllFromDatabase
  } = require('./db');

  meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
  });

  meetingsRouter.post('/', (req, res, next) => {
    newMeeting = createMeeting();
    addedMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(addedMeeting);
  });

  meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
  });