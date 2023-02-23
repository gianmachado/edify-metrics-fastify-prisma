import fastify, { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client'
const fastify_cors = require('@fastify/cors')

// use it before all route definitions
const prisma = new PrismaClient()
const app: FastifyInstance = fastify({
    logger: true
})

app.register(fastify_cors, {
    "origin": '*',
})



interface ITracker {
    id: number
    action: string
    origin: string
    plataform: string
    data: string
    user: string
    entity: string
    created_at: Date
}

app.get('/health', (_, reply) => {
    reply.send({ message: "Ok" })
})

type MyRequest = FastifyRequest<{
    Body: ITracker
}>

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