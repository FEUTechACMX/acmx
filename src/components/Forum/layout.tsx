import Link from "next/link"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 py-6">
          <Sidebar className="hidden lg:flex w-[240px] shrink-0 sticky top-[4.5rem] h-[calc(100vh-4.5rem)]" />
          <main className="flex-1 min-w-0">
            {children}
          </main>
          <aside className="hidden xl:block w-[240px] shrink-0 sticky top-[4.5rem] h-[calc(100vh-4.5rem)]">
            <div className="space-y-4">
              <h3 className="font-semibold">Popular Tags</h3>
              <div className="space-y-2">
                {[
                  { name: "design", count: "2532" },
                  { name: "programming", count: "1839" },
                  { name: "javascript", count: "1243" },
                  { name: "discussion", count: "983" },
                ].map((tag) => (
                  <div key={tag.name} className="flex items-center justify-between text-sm">
                    <Link 
                      href={`/forum/tags/${tag.name}`} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      #{tag.name}
                    </Link>
                    <span className="text-muted-foreground">{tag.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

