const survey = db.define('survey', {
    form_id: Sequelize.INTEGER,
    survey_feedback: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('survey_feedback') ? JSON.parse(this.getDataValue('survey_feedback')) : "";
        }
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss') : "";
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss') : "";
        }
    }
})

const form = require('./forms.schema');
survey.belongsTo(form, {
    foreignKey: 'form_id',
});

form.hasMany(survey, {
    foreignKey: 'form_id',
});

survey.sync({
    logging: false,
    alter: true
});

module.exports = survey;