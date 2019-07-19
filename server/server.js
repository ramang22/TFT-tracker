//imports
const fastify = require('fastify')()
const path = require('path')

//routers

fastify.register(require('./routes/users'), { prefix: '/users' })

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
})

//listener
fastify.listen(3000, (err) => {
    if (err) {
        console.log(err)
        process.exit(1)
    } else {
        console.log('Server is up and running on port 3000...')
    }

})


