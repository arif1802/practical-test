const question = db.define('questions', {
    form_id: Sequelize.INTEGER,
    question: Sequelize.STRING,
    answer_type: Sequelize.INTEGER,
    choices: Sequelize.STRING,
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('DD/MM/YYYY') : "";
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY') : "";
        }
    }
})

const form = require('./forms.schema');
question.belongsTo(form, {
    foreignKey: 'form_id',
});

form.hasMany(question, {
    foreignKey: 'form_id',
});

question.sync({
    logging: false,
    alter: false
});

module.exports = question;