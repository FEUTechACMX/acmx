import Link from "next/link"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_280px] md:gap-6 lg:gap-8">
        <Sidebar className="hidden md:block" />
        <main className="py-6">{children}</main>
        <aside className="hidden lg:block py-6">
          <div className="sticky top-20">
            <h3 className="font-semibold mb-4">Popular Tags</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <Link href="/tags/design" className="hover:underline">#design</Link>
                <span className="text-muted-foreground">2532</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link href="/tags/programming" className="hover:underline">#programming</Link>
                <span className="text-muted-foreground">1839</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link href="/tags/javascript" className="hover:underline">#javascript</Link>
                <span className="text-muted-foreground">1243</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link href="/tags/discussion" className="hover:underline">#discussion</Link>
                <span className="text-muted-foreground">983</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

