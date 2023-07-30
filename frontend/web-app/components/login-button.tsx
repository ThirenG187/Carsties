'use client'

import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'

interface LoginButtonProps {}

const LoginButton: React.FC<LoginButtonProps> = () => {
  return (
    <Button outline onClick={() => signIn('id-server', { callbackUrl: '/' })}>
      Login
    </Button>
  )
}

export default LoginButton
