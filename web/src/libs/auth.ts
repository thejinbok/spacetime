import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface JWT {
  user: {
    name: string
    avatarUrl: string
  }
  sub: string
  iat: number
  exp: number
}

export function getJWT(): JWT {
  const jwt = cookies().get('jwt')?.value

  if (!jwt) {
    throw new Error('Unauthenticated.')
  }

  return decode(jwt)
}
