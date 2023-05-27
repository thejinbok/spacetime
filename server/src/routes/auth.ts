import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios from 'axios'
import { prisma } from '../libs/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        }
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
      login: z.string(),
      avatar_url: z.string().url(),
    })

    const userInformation = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInformation.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInformation.id,
          name: userInformation.name,
          username: userInformation.login,
          avatarUrl: userInformation.avatar_url,
        },
      })
    }

    const jwt = app.jwt.sign({
      user: {
        name: user.name,
        avatarUrl: user.avatarUrl
      },
    }, {
      sub: user.id,
      expiresIn: '1 day',
    })

    return {
      jwt,
    }
  })
}
