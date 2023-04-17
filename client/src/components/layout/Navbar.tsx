import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="flex justify-between mx-16 my-12">
      <a href="/">
        <Image src="/sob.svg" alt="sons of blocks" width={50} height={50}/>
      </a>
      <ConnectButton />
    </nav>
  )
}

export default Navbar;