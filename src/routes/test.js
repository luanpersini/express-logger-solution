const express = require('express');
const logger = require('../adapters/logger');
const router = express.Router();

router.get('/ok', async (req, res) => {
  const genres = [
    { _id: 1, name: 'genre1' },
    { _id: 2, name: 'genre2' },
    { _id: 3, name: 'genre3' }
  ];
  res.send(genres);
});

router.get('/exception', async (req, res) => {
  throw new Error('unhandled Exception ');
});

router.get('/rejection', async (req, res) => {
  const p = Promise.reject(new Error('Promisse Rejected Test'));
  p.then(() =>   console.log('wont get here'));
});

router.get('/rejection-2', async (req, res) => {
  const p = Promise.reject(new Error('Promisse Rejected Test')).catch(e => logger.errorCatch(e));
  p.then(() =>   console.log('wont get here'));
});

router.get('/error-400', async (req, res) => {
  logger.warn('Bad Request');
  return res.status(400).send('Error 400');
});

router.get('/error-500', async (req, res) => {
    Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true
      }
    );
    res.send(genre); 

});

module.exports = router;
