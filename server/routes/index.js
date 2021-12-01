
module.exports = app => {
    app.use('/api', require('./formbuilder.routes'))
}