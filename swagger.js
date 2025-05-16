module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Users API',
    version: '1.0.0',
    description: 'API for managing users',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get a single user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              pattern: '^[a-fA-F0-9]{24}$',
            },
          },
        ],
        responses: {
          200: {
            description: 'A single user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          404: {
            description: 'User not found',
          },
        },
      },
      put: {
        summary: 'Update a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              pattern: '^[a-fA-F0-9]{24}$',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          204: {
            description: 'User updated',
          },
          404: {
            description: 'User not found',
          },
        },
      },
      delete: {
        summary: 'Delete a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              pattern: '^[a-fA-F0-9]{24}$',
            },
          },
        ],
        responses: {
          204: {
            description: 'User deleted',
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        properties: {
          firstName: {
            type: 'string',
            example: 'Jean',
          },
          lastName: {
            type: 'string',
            example: 'Kabila',
          },
          email: {
            type: 'string',
            example: 'jean.kabila@example.com',
          },
          favoriteColor: {
            type: 'string',
            example: 'Blue',
          },
          birthday: {
            type: 'string',
            format: 'date',
            example: '1985-12-15',
          },
        },
      },
    },
  },
};
