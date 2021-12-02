const AnswerTypes = require('../schemas/answer.types.schema');
const Form = require('../schemas/forms.schema');
const Survey = require('../schemas/survey.schema');
const Question = require('../schemas/questions.schema');

module.exports = {
    async fetchAnswerTypes() {
        return await AnswerTypes.findAll({
            where: { status: 1 }
        })
    },
    async saveForm(body) {
        return await Form.create(body)
    },
    async saveQuestion(body) {
        return await Question.create(body)
    },
    async saveSurvey(body) {
        return await Survey.create(body)
    },
    async fetchSingleForm(condition) {
        return await Form.findOne({
            where: condition
        })
    },
    async fetchForms() {
        return await Form.findAll({
            where: { status: 1 },
            include: [{
                model: Survey
            }],
            order: [
                ['id', 'DESC'],
            ],
        })
    },
    async fetchForm(slug) {
        return await Form.findOne({
            where: { status: 1, slug: slug },
            include: [
                { model: Question }
            ]
        })
    },
}