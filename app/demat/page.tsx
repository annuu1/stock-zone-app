"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye, Plus, Trash2 } from "lucide-react"
import { mockDematAccounts } from "@/lib/mock-data"

export default function DematAccountsPage() {
  const [accounts, setAccounts] = useState(mockDematAccounts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demat Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage your broker accounts in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Demat Account</DialogTitle>
                <DialogDescription>Connect your broker account using API credentials</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <FormLabel htmlFor="broker">Broker</FormLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select broker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zerodha">Zerodha</SelectItem>
                      <SelectItem value="upstox">Upstox</SelectItem>
                      <SelectItem value="angelone">Angel One</SelectItem>
                      <SelectItem value="groww">Groww</SelectItem>
                      <SelectItem value="icici">ICICI Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <FormLabel htmlFor="apiKey">API Key</FormLabel>
                  <Input id="apiKey" placeholder="Enter your API key" />
                </div>
                <div className="grid gap-2">
                  <FormLabel htmlFor="apiSecret">API Secret</FormLabel>
                  <Input id="apiSecret" type="password" placeholder="Enter your API secret" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Connect Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {accounts.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent className="pt-6 flex flex-col items-center">
            <p className="mb-4 text-muted-foreground">You haven't connected any Demat accounts yet</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Connect Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{account.brokerName}</CardTitle>
                    <CardDescription>{account.accountId}</CardDescription>
                  </div>
                  <Badge variant={account.isActive ? "success" : "outline"}>
                    {account.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Funds:</span>
                    <span className="font-medium">₹{account.availableFunds.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Holdings Value:</span>
                    <span className="font-medium">₹{account.holdingsValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Connected On:</span>
                    <span className="font-medium">{new Date(account.connectedOn).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

