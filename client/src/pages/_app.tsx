import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { useState, useEffect } from 'react'
import { WagmiConfig } from 'wagmi'
import { chains, client } from '@/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import '@/styles/globals.css'
import { Navbar } from "@/components/layout"

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        <NextHead>
          <title>Sons of Blocks</title>
        </NextHead>
        <Navbar />
        <main>
          {mounted && <Component {...pageProps} />}
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
