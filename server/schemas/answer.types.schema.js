const cars = db.define('answer_types', {
  name: Sequelize.STRING,
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

cars.sync({
  logging: false,
  alter: false
});

module.exports = cars;