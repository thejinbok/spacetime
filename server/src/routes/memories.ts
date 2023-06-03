import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../libs/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.description.substring(0, 117).concat('...')
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      coverUrl: z.string(),
      description: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { coverUrl, description, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return prisma.memory.update({
      where: {
        id,
      },
      data: {
        coverUrl,
        description,
        isPublic,
      },
    })
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      coverUrl: z.string(),
      description: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { coverUrl, description, isPublic } = bodySchema.parse(request.body)

    return prisma.memory.create({
      data: {
        coverUrl,
        description,
        isPublic,
        userId: request.user.sub,
      },
    })
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
