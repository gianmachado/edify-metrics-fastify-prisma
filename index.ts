import fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from '@prisma/client'
const fastify_cors = require('@fastify/cors')

const prisma = new PrismaClient()
const app: FastifyInstance = fastify({
    logger: true
})

app.register(fastify_cors, {
    "origin": '*',
})

app.get('/health', (_, reply) => {
    reply.send({ message: "Ok" })
})


app.get('/sendAction', async (_, reply) => {

    const data = {
        "action": "LESSON_VIEW",
        "origin": "TOOLKIT",
        "plataform": "WEB",
        "data": "NOTHING",
        "user": "1235-4433",
        "entity": "213213-3213"
    }

    await prisma.tracker.create({
        data: {
            ...data
        }
    })

    reply.send({ success: true })
})


app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    app.log.info(`server listening on ${address}`)
})