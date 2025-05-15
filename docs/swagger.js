const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Private Note API',
            version: '1.0.0',
            description: 'API documentation for the Private Notes App'
        },
        components: {
            securitySchemes :{
                bearerAuth :{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
        security: [{bearerAuth: []}]
    },
    apis: ['./routes/*.js']
}

module.exports = swaggerJSDoc(options);