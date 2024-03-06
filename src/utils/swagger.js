import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinitions = {
  "/api/user/register": {
    "post": {
      "summary": "Register",
      "description": "Register a new user.",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "firstName": {
                  "type": "string",
                  "description": "The first name of the user."
                },
                "lastName": {
                  "type": "string",
                  "description": "The last name of the user."
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "The email address of the user."
                },
                "password": {
                  "type": "string",
                  "format": "password",
                  "description": "The password of the user."
                },
                "idProof": {
                  "type": "string",
                  "description": "Optional ID proof of the user."
                }
              },
              "required": [
                "firstName",
                "lastName",
                "email",
                "password"
              ]
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "User registered successfully."
        },
        "400": {
          "description": "Bad request - Registration failed."
        }
      }
    }
  },
};




const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'eezePG ( in-progress )',
      version: '1.0.0',
      description: 'API for finding PGs and hostels near colleges',
      contact: {
        name: 'Rahul Dhakad',
        email: 'Dhakad706@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
  paths: swaggerDefinitions 
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);