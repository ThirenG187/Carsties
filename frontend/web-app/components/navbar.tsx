import Search from '@/components/search'
import Logo from './logo'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-5 text-gray-800 bg-white shadow-md">
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  )
}

export default Navbar
