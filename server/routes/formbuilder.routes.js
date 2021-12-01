var express = require('express')
var router = express.Router()

const FormBuilderController = require('../controllers/formbuilder.controller');

// Answer Types Routes
router.get("/get-answer-types", FormBuilderController.getAnswerTypes)

// Forms Routes
router.get("/forms", FormBuilderController.getForms)
router.post('/check-form-exist', FormBuilderController.checkFormExist)
router.post('/save-form', FormBuilderController.saveForm)

// Survey Routes
router.get("/form/:slug", FormBuilderController.getForm)
router.post("/survey", FormBuilderController.saveSurvey)

module.exports = router;