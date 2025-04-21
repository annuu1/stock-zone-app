import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Bell, Briefcase, LineChart, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xl font-bold">StockZoneTracker</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/zones" className="text-sm font-medium hover:underline underline-offset-4">
              Zones
            </Link>
            <Link href="/demat" className="text-sm font-medium hover:underline underline-offset-4">
              Demat Accounts
            </Link>
            <Link href="/alerts" className="text-sm font-medium hover:underline underline-offset-4">
              Alerts
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Track Demand & Supply Zones for Smarter Trading
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Identify optimal entry and exit points with our advanced zone tracking system. Manage your Demat
                  accounts and set price alerts all in one place.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/zones">
                    <Button className="w-full min-[400px]:w-auto">
                      View Zones
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full min-[400px]:w-auto">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video bg-gradient-to-br from-primary/20 to-muted rounded-lg flex items-center justify-center">
                  <LineChart className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="text-muted-foreground md:text-xl">
                  Everything you need to make informed trading decisions
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Demand & Supply Zones</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View and analyze fresh and tested demand/supply zones with detailed information and ratings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Demat Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect and manage multiple Demat accounts from different brokers in one unified interface.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Bell className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Price Alerts</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Set custom price alerts to notify you when stocks enter your target demand or supply zones.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-lg font-semibold">StockZoneTracker</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left md:ml-auto">
            &copy; {new Date().getFullYear()} StockZoneTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

