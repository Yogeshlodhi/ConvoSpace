import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
//providers
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ReduxProvider } from '@/redux/Provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { cn } from '@/lib/utils'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const sans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Convo Space',
  description: 'Create, Share, Connect — Welcome to Convo Space',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          sans.className,
          "bg-white dark:bg-[#313338]"
        )}>
          <ReduxProvider>
            <ThemeProvider attribute="class"
              defaultTheme="dark"
              enableSystem={true}
              storageKey="chat-theme">
              <SocketProvider>
                <ModalProvider />
                <QueryProvider>
                  {children}
                </QueryProvider>
              </SocketProvider>
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
