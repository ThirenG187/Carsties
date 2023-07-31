'use client'

import useAuctionParams from '@/hooks/useAuctionParams'
import { Button, Dropdown } from 'flowbite-react'
import { Car, Cog, LogOut, Trophy, UserIcon } from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface UserActionsProps {
  user: User
}

const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { setParams } = useAuctionParams()

  const setWinner = () => {
    setParams({ winner: user.username, seller: undefined })
    if (pathname !== '/') router.push('/')
  }

  const setSeller = () => {
    setParams({ seller: user.username, winner: undefined })
    if (pathname !== '/') router.push('/')
  }

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={UserIcon} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={Trophy} onClick={setWinner}>
        Auctions Won
      </Dropdown.Item>
      <Dropdown.Item icon={Car}>
        <Link href="/auctions/create">Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={Cog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={LogOut}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}

export default UserActions
