"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function DashboardNav() {
  const pathname = usePathname();
  const { signOut, profile } = useAuth();

  const navItems = [
    {
      href: "/dashboard",
      label: "Projets",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/affiliate",
      label: "Affiliation",
      icon: Users,
    },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                    isActive
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {profile && (
              <div className="text-right">
                <p className="text-sm font-medium">
                  {profile.full_name || profile.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {profile.subscription_status === "pro" ? "Pro" : "Free"} •{" "}
                  {profile.credits} crédits
                </p>
              </div>
            )}
            <button
              onClick={signOut}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
