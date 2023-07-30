'use client'

import { Button, Dropdown } from 'flowbite-react'
import { Car, Cog, LogOut, Trophy, UserIcon } from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface UserActionsProps {
  user: Partial<User>
}

const UserActions: React.FC<UserActionsProps> = ({ user }) => (
  <Dropdown inline label={`Welcome ${user.name}`}>
    <Dropdown.Item icon={UserIcon}>
      <Link href="/">My Auctions</Link>
    </Dropdown.Item>
    <Dropdown.Item icon={Trophy}>
      <Link href="/">Auctions Won</Link>
    </Dropdown.Item>
    <Dropdown.Item icon={Car}>
      <Link href="/">Sell my car</Link>
    </Dropdown.Item>
    <Dropdown.Item icon={Cog}>
      <Link href="/session">Session (dev only)</Link>
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item icon={LogOut} onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </Dropdown.Item>
  </Dropdown>
)

export default UserActions
