"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const fastify_cors = require('@fastify/cors');
// use it before all route definitions
const prisma = new client_1.PrismaClient();
const app = (0, fastify_1.default)({
    logger: true
});
app.register(fastify_cors, {
    "origin": '*',
});
app.get('/health', (_, reply) => {
    reply.send({ message: "Ok" });
});
app.get('/sendAction', async (_, reply) => {
    const data = {
        "action": "LESSON_VIEW",
        "origin": "TOOLKIT",
        "plataform": "WEB",
        "data": "NOTHING",
        "user": "1235-4433",
        "entity": "213213-3213"
    };
    await prisma.tracker.create({
        data: {
            ...data
        }
    });
    reply.send({ success: true });
});
app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
});
