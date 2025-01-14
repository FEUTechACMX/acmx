"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogOut, MessageSquare, Tag, Search, Moon, Sun } from 'lucide-react';
import { cn } from "~/lib/utils";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const navigation = [
  { name: "Home", href: "/forum", icon: Home },
  { name: "Questions", href: "/forum/questions", icon: MessageSquare },
  { name: "Topics", href: "/forum/topics", icon: Tag },
  { name: "Search", href: "/forum/search", icon: Search },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="hidden md:flex h-screen">
      <div className="flex w-60 flex-col border-r bg-background">
        <div className="flex-1 space-y-2 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-[15px] transition-colors rounded-md",
                "hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "font-medium bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          <div className="mt-4 px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {mounted && theme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="text-sm font-medium text-muted-foreground">
                {mounted && theme === "dark" ? "Dark" : "Light"} mode
              </span>
            </div>
            {mounted && (
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            )}
          </div>
        </div>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <Link href="/logout">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

