const express = require('express');

const router = express.Router();

const companiesController = require('../controllers/companies-controller');

const bodyParser = require('body-parser').json();

// get users
router.get('/get-companies', companiesController.getCompanies);

// add company
router.post('/add-company', bodyParser, companiesController.addCompany);

// edit company
router.patch('/edit-company', bodyParser, companiesController.editCompany);

// delete company
router.post('/delete-company', bodyParser, companiesController.deleteCompany);

module.exports = router;