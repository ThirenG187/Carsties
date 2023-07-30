import Search from '@/components/search'
import Logo from './logo'
import LoginButton from './login-button'
import { getCurrentUser } from '@/actions/auth/getCurrentUser'
import UserActions from './user-actions'

const Navbar = async () => {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-5 text-gray-800 bg-white shadow-md">
      <Logo />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  )
}

export default Navbar
