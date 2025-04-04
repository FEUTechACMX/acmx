import { AppSidebar } from '~/components/Forum/app-sidebar'
import { Header } from '~/components/Forum/header'
import { ThemeProvider } from '~/components/Forum/theme-provider'
import { QuestionsProvider } from '~/lib/question-context'
import { cn } from '~/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Forum App',
  description: 'A forum application similar to Stack Overflow and Reddit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuestionsProvider>
            <div className="flex h-screen overflow-hidden">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                  {children}
                </main>
              </div>
            </div>
          </QuestionsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

