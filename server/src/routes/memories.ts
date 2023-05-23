import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../libs/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
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

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    return prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
  })

  app.put('/memories/:id', async (request) => {
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
        userId: 'ee0d8aa4-70f8-4b5e-873c-5d9a20f3a7a7', // TODO: unmock it
      },
    })
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
