import express from 'express'

const router = express.Router()

router.use((request, response, next) => {
    console.log('Este es un middleware a nivel del router de koders ')
    next()
})

function myMiddleware(request, response, next) {
    console.log('Este es un middleware del endpoint GET /koders')
    next()
}

router.get('/', myMiddleware, (request, response) => {
    try {
        response.json({
            message: 'Aqui estarán todos los koders'
        })
    } catch (error) {
        next(error)
    }
    
})

router.post('/', (request, response) => {
    try {
        response.json({
            message: 'Aqui se crearán koders'
        })
    } catch (error) {
        next(error)
    }
    
})

export default router