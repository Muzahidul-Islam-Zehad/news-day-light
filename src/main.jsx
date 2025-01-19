import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router'
import AuthProvider from './Provider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PaymentProvider from './Provider/PaymentProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'


const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Publisher_Key);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <PaymentProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster position='top-right' />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PaymentProvider>
      </AuthProvider>
    </Elements>
  </StrictMode>,
)
