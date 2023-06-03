import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/libs/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const signInResponse = await api.post('/sign-in', {
    code: searchParams.get('code'),
  })

  const { jwt } = signInResponse.data

  return NextResponse.redirect(new URL('/', request.url), {
    headers: {
      'Set-Cookie': `jwt=${jwt}; Path=/; Max-Age=86400;`,
    },
  })
}
