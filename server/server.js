//imports
const fastify = require('fastify')()

//routers
fastify.register(require('./routes/users'), { prefix: '/users' })


//listener
fastify.listen(3000, (err) => {
    if (err) {
        console.log(err)
        process.exit(1)
    } else {
        console.log('Server is up and running on port 3000...')
    }
})
