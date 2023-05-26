import { User } from 'lucide-react'
import Image from 'next/image'

import logo from '../assets/logo.svg'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2 ">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/stars-background.svg)] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>

        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Create your account</span> and save your
            memories!
          </p>
        </a>

        <div className="space-y-5">
          <Image src={logo} alt="Logo written NLW Spacetime." />

          <div className="max-w-[420px] space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Your time capsule
            </h1>
            <p className="text-lg leading-relaxed">
              Collect memorable moments from your journey and share (if you
              like) with the world.
            </p>
          </div>

          <a
            href=""
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          >
            Create memory
          </a>
        </div>

        <div className="text-sm leading-relaxed text-gray-200">
          Made with 💜 by{' '}
          <a
            href="https://thejinbok.world"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-100"
          >
            Jin Bok
          </a>
          .
        </div>
      </div>

      <div className="flex flex-col bg-[url(../assets/stars-background.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            You haven&apos;t registered any memories yet.{' '}
            <a href="" className="underline hover:text-gray-50">
              Start creating
            </a>{' '}
            now!
          </p>
        </div>
      </div>
    </main>
  )
}
