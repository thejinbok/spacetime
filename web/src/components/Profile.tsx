import Image from 'next/image'

import { getJWT } from '@/libs/auth'

export function Profile() {
  const { user } = getJWT()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={user.avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {user.name}

        <a href="" className="block text-red-400 hover:text-red-300">
          Log out
        </a>
      </p>
    </div>
  )
}
