'use client'

import useAuctionParams from '@/hooks/useAuctionParams'
import { Button, Dropdown } from 'flowbite-react'
import { Car, Cog, LogOut, Trophy, UserIcon } from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  AiOutlineUser,
  AiOutlineTrophy,
  AiOutlineCar,
  AiOutlineLogout,
} from 'react-icons/ai'
import { HiCog } from 'react-icons/hi2'

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
      <Dropdown.Item icon={AiOutlineUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={AiOutlineTrophy} onClick={setWinner}>
        Auctions Won
      </Dropdown.Item>
      <Dropdown.Item icon={AiOutlineCar}>
        <Link href="/auctions/create">Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}

export default UserActions
