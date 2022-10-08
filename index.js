import express from 'express'

import {StatusHttp} from './StatusHttp.js'
import kodersRouter from './routers/koders.router.js'

const server = express()

// midlewares

function validOrange (request, response, next) {
    console.log('1. Este es un middleware de aplicacion')
    request.isGoodOrange = true
    if(request.isGoodOrange) {
        next()
        return
    }
    response.status(400).json({
        message: 'Ohh no, las naranjas estan muy mal >.<'
    })
}

server.use(validOrange)

server.use((request, response, next) => {
    console.log('2. Este es otro middleware')
    next()
})
// Routers
server.use('/koders', kodersRouter)

// Endpoints

server.get('/', (request, response) => {
    try {
        console.log('Desde: GET /')
        // console.log(request.oranges)
        
        response.json({
            message: 'Middlewares en express'
        })
    } catch (error) {
        next(error)
    }
    
})

server.get('/hola', (request, response, next) =>  {
    try {
        throw new StatusHttp('Ocurrio un error', 500)

        response.json({
            message: 'Hola desde express'
        })
    } catch (error) {
        // response.status(error.status).json({
        //     success: false,
        //     message: error.message
        // })

        next(error)
    }
})

function handleErrors(error, request, response, next) {
    response.status(error.status).json({
        success: false,
        message: 'Server internal error'
    })
}

server.use(handleErrors)

/*
NOTE: 
    Un middleware es una función

    (request, response,next) => {}

    3 Niveles de middleware:
        1. Nivel de aplicación o servidor
        2. Nivel de router
        3. Nivel de endpoint

    server.use(middleware)
*/



server.listen(8080, () => {
    console.log('Server listening on port 8080')
})