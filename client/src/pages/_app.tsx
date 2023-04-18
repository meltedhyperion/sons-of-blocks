import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { useState, useEffect } from 'react'
import { WagmiConfig } from 'wagmi'
import { chains, client } from '@/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import '@/styles/globals.css'
import { Navbar } from "@/components/layout"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <NextHead>
          <title>Sons of Blocks</title>
          <meta name="description" content="Sons of Blocks" />
          <link rel="icon" href="/sob.svg" type="image/svg+xml" />
        </NextHead>
        <QueryClientProvider client={queryClient!}>
          <Navbar />
          <main>
            {mounted && <Component {...pageProps} />}
          </main>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
