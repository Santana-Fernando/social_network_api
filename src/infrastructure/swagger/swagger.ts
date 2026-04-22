import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "API de usuários",
    },
  },
  apis: ["dist/interfaces/http/routes/**/*.js"], // onde estão suas rotas
});