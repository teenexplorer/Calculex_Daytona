import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
const app = new Application();

// Basic CORS configuration
app.use(oakCors());

// Routes
router.get("/", (ctx) => {
  ctx.response.body = {
    message: "Welcome to Daytona Deno API",
    status: "running"
  };
});

router.get("/api/health", (ctx) => {
  ctx.response.body = {
    status: "healthy",
    timestamp: new Date().toISOString()
  };
});

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.status || 500;
    ctx.response.body = {
      message: err.message || "Internal Server Error",
      status: "error"
    };
  }
});

// Use router
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const port = 8000;
console.log(`Deno server running on http://localhost:${port}`);
await app.listen({ port });