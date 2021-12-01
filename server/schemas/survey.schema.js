const survey = db.define('survey', {
    form_builder_id: Sequelize.INTEGER,
    answer: Sequelize.STRING,
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

const FormBuilder = require('./formbuilder.schema');
survey.belongsTo(FormBuilder, {
    foreignKey: 'form_builder_id',
});

FormBuilder.hasMany(survey, {
    foreignKey: 'form_builder_id',
});

survey.sync({
    logging: false,
    alter: false
});

module.exports = survey;