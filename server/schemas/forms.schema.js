const forms = db.define('forms', {
    form_name: Sequelize.STRING,
    slug: Sequelize.STRING,
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

forms.sync({
    logging: false,
    alter: false
});

module.exports = forms;