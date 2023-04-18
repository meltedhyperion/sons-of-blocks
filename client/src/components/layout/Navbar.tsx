import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between mx-16 my-12">
      <Link href="/">
        <Image src="/sob.svg" alt="sons of blocks" width={50} height={50}/>
      </Link>
      <ConnectButton />
    </nav>
  )
}

export default Navbar;