export const swaggerConfig = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            title: "API books",
            description: "dummy api to test API books",
            version: "1.0.0"
        },
        servers: [
            { url: "http://localhost:3000" }
        ]
    },
    apis: ['./**/*.ts']
}
