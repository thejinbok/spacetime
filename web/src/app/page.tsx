import { cookies } from 'next/headers'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { NoMemories } from '@/components/NoMemories'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2 ">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/stars-background.svg)] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>

        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

        {cookies().has('jwt') ? <Profile /> : <SignIn />}

        <Hero />

        <Copyright />
      </div>

      <div className="flex flex-col bg-[url(../assets/stars-background.svg)] bg-cover p-16">
        <NoMemories />
      </div>
    </main>
  )
}
