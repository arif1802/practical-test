const AnswerTypes = require('../schemas/answer.types.schema');
const FormBuilder = require('../schemas/formbuilder.schema');
const Survey = require('../schemas/survey.schema');

module.exports = {
    async fetchAnswerTypes() {
        return await AnswerTypes.findAll({
            where: { status: 1 }
        })
    },
    async saveForm(body) {
        return await FormBuilder.create(body)
    },
    async saveSurvey(body) {
        return await Survey.create(body)
    },
    async fetchSingleForm(condition) {
        return await FormBuilder.findOne({
            where: condition
        })
    },
    async fetchForms() {
        return await FormBuilder.findAll({
            where: { status: 1 },
            include: [{
                model: Survey
            }]
        })
    },
    async fetchForm(slug) {
        return await FormBuilder.findOne({
            where: { status: 1, slug: slug }
        })
    },
}