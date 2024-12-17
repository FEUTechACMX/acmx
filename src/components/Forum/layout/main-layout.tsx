import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { TagsSidebar } from "./tags-sidebar"

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <div className="container">
          <TopBar />
          <div className="flex gap-4 lg:gap-8">
            <div className="flex-1">{children}</div>
            <TagsSidebar className="hidden lg:block" />
          </div>
        </div>
      </main>
    </div>
  )
}

