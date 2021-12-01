const formBuilder = db.define('form_builder', {
    form_name: Sequelize.STRING,
    question: Sequelize.STRING,
    slug: Sequelize.STRING,
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

formBuilder.sync({
    logging: false,
    alter: false
});

module.exports = formBuilder;