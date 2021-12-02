const FormBuilder = require('../models/formbuilder.model');
module.exports = {
    async getAnswerTypes(req, res) {
        const answerTypes = await FormBuilder.fetchAnswerTypes();
        if (answerTypes) {
            res.send({ success: true, data: answerTypes })
        } else {
            res.send({ success: false, msg: "Something went wrong" })
        }
    },
    async saveForm(req, res) {
        const form = await FormBuilder.saveForm(req.body);
        if (form) {
            const questions = await req.body.question.forEach(element => {
                if (element.question) {
                    const body = element;
                    body.form_id = form.id;
                    FormBuilder.saveQuestion(body);
                }
            });

            res.send({ success: true, msg: "Form Saved successfully" })
        } else {
            res.send({ success: false, msg: "Something went wrong" })
        }
    },
    async checkFormExist(req, res) {
        const checkIfFormExists = await FormBuilder.fetchSingleForm({ status: 1, slug: req.body.formName.replace(" ", "-").toLowerCase() });
        if (checkIfFormExists) {
            res.send({ success: false, msg: "Form already exist. Please try another name" })
        } else {
            res.send({ success: true })
        }
    },
    async getForms(req, res) {
        const forms = await FormBuilder.fetchForms();
        res.send({ success: true, data: forms })
    },
    async getForm(req, res) {
        const form = await FormBuilder.fetchForm(req.params.slug);
        if (form) {
            res.send({ success: true, data: form })
        } else {
            res.send({ success: false, msg: "Please use correct form url" })
        }
    },
    async saveSurvey(req, res) {
        const body = req.body;
        body.survey_feedback = JSON.stringify(req.body.survey_feedback);
        const survey = await FormBuilder.saveSurvey(req.body);
        if (survey) {
            res.send({ success: true, msg: "You have successfully submitted survey" })
        } else {
            res.send({ success: false, msg: "Something went wrong" })
        }
    },
}