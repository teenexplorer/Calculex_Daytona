# Daytona Deno API

This is a basic Deno web server built with Oak framework and integrated with Daytona.

## Features

- Built with Deno and Oak framework
- CORS enabled
- Basic error handling
- Health check endpoint
- Dev container support

## Getting Started

1. Make sure you have Daytona and VS Code with Remote Containers extension installed
2. Open this project in VS Code
3. When prompted, click "Reopen in Container"
4. Once the container is built and running, open a terminal and run:

```bash
cd deno
deno task dev
```

The server will start on port 8000.

## Available Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Development

- `deno task start` - Start the server
- `deno task dev` - Start the server with watch mode
- `deno task test` - Run tests

## Environment

The project includes a devcontainer configuration that sets up:

- Deno runtime
- Node.js LTS
- VS Code extensions for Deno
- Appropriate VS Code settings for Deno development