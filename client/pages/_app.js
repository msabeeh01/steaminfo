import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

  return (

    <div className='flex h-screen w-screen flex-col bg-white'>
          <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </div>

  )

}
