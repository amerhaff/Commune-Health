"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { ArrowLeft, DollarSign, Users, Calendar, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { cn } from "@/lib/utils"

interface MonthlyData {
month: string;
revenue: number;
commissions: number;
clients: number;
}

interface ClientRevenue {
id: string;
name: string;
monthlyData: MonthlyData[];
annualRevenue: number;
yearToDateRevenue: number;
annualCommissions: number;
yearToDateCommissions: number;
}

export default function BrokerRevenuePage() {
const [selectedMonth, setSelectedMonth] = useState("December")
const [selectedYear, setSelectedYear] = useState("2023")
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const years = ["2021", "2022", "2023"]

const [clientRevenues] = useState<ClientRevenue[]>([
  {
    id: "1",
    name: "TechCorp Inc.",
    monthlyData: months.map((month, index) => ({
      month,
      revenue: 50000 + (index * 2000),
      commissions: 5000 + (index * 200),
      clients: 5 + (index % 3)
    })),
    annualRevenue: 780000,
    yearToDateRevenue: 650000,
    annualCommissions: 78000,
    yearToDateCommissions: 65000
  },
  {
    id: "2",
    name: "HealthCare Solutions",
    monthlyData: months.map((month, index) => ({
      month,
      revenue: 75000 + (index * 3000),
      commissions: 7500 + (index * 300),
      clients: 7 + (index % 4)
    })),
    annualRevenue: 1170000,
    yearToDateRevenue: 975000,
    annualCommissions: 117000,
    yearToDateCommissions: 97500
  },
  {
    id: "3",
    name: "EduLearn Systems",
    monthlyData: months.map((month, index) => ({
      month,
      revenue: 30000 + (index * 1500),
      commissions: 3000 + (index * 150),
      clients: 3 + (index % 2)
    })),
    annualRevenue: 468000,
    yearToDateRevenue: 390000,
    annualCommissions: 46800,
    yearToDateCommissions: 39000
  },
]);

const currentMonthData = clientRevenues.map(client => ({
  ...client,
  currentData: client.monthlyData.find(data => data.month === selectedMonth)
}));

const totalMonthlyRevenue = currentMonthData.reduce(
  (sum, client) => sum + (client.currentData?.revenue || 0),
  0
);

const totalMonthlyCommissions = currentMonthData.reduce(
  (sum, client) => sum + (client.currentData?.commissions || 0),
  0
);

const totalAnnualRevenue = clientRevenues.reduce(
  (sum, client) => sum + client.annualRevenue,
  0
);

const totalAnnualCommissions = clientRevenues.reduce(
  (sum, client) => sum + client.annualCommissions,
  0
);

const totalYearToDateRevenue = clientRevenues.reduce(
  (sum, client) => sum + client.yearToDateRevenue,
  0
);

const totalYearToDateCommissions = clientRevenues.reduce(
  (sum, client) => sum + client.yearToDateCommissions,
  0
);

const totalClients = currentMonthData.reduce(
  (sum, client) => sum + (client.currentData?.clients || 0),
  0
);

const revenueGrowth = 18.5; // Example growth percentage
const clientGrowth = 12.3; // Example growth percentage

const chartData = months.map(month => ({
  name: month,
  revenue: clientRevenues.reduce((sum, client) => {
    const monthData = client.monthlyData.find(data => data.month === month);
    return sum + (monthData?.revenue || 0);
  }, 0),
  commissions: clientRevenues.reduce((sum, client) => {
    const monthData = client.monthlyData.find(data => data.month === month);
    return sum + (monthData?.commissions || 0);
  }, 0),
  clients: clientRevenues.reduce((sum, client) => {
    const monthData = client.monthlyData.find(data => data.month === month);
    return sum + (monthData?.clients || 0);
  }, 0),
}));

return (
  <div className="flex flex-col min-h-screen">
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link className="flex items-center space-x-2" href="/broker/home">
          <Image
            src="/Simpliwell_logo.png"
            alt="Simpliwell"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <Button
          onClick={() => {
            window.location.href = '/'
          }}
          className="rounded-full"
          style={{ backgroundColor: '#1400FF' }}
        >
          Logout
        </Button>
      </div>
    </header>

    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Revenue and Commissions Overview</h1>
        <Button asChild variant="outline">
          <Link href="/broker/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAnnualRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {revenueGrowth >= 0 ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-blue-600" />
                  {revenueGrowth}% from last year
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-blue-600" />
                  {Math.abs(revenueGrowth)}% from last year
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Commissions</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAnnualCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total commissions for {selectedYear}</p>
          </CardContent>
        </Card>
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Commissions</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For {selectedMonth} {selectedYear}</p>
          </CardContent>
        </Card>
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {clientGrowth >= 0 ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-blue-600" />
                  {clientGrowth}% from last month
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-blue-600" />
                  {Math.abs(clientGrowth)}% from last month
                </span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="data-[state=active]:bg-black data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-black data-[state=active]:text-white">Monthly Breakdown</TabsTrigger>
          <TabsTrigger value="client" className="data-[state=active]:bg-black data-[state=active]:text-white">Client Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle>Revenue and Commission Trends</CardTitle>
              <CardDescription>Annual overview of revenue, commissions, and client growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="commissions" name="Commissions" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="clients" name="Clients" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Monthly Revenue and Commissions</CardTitle>
              <div className="flex space-x-2">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">Revenue: ${totalMonthlyRevenue.toLocaleString()} | Commissions: ${totalMonthlyCommissions.toLocaleString()}</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Commissions</TableHead>
                    <TableHead>Clients</TableHead>
                    <TableHead>% of Total Commissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMonthData.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>${client.currentData?.revenue.toLocaleString()}</TableCell>
                      <TableCell>${client.currentData?.commissions.toLocaleString()}</TableCell>
                      <TableCell>{client.currentData?.clients}</TableCell>
                      <TableCell>{((client.currentData?.commissions || 0) / totalMonthlyCommissions * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="client">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle>Revenue and Commissions by Client</CardTitle>
              <CardDescription>Detailed breakdown of revenue and commissions by client</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Annual Revenue</TableHead>
                    <TableHead>Year-to-Date Revenue</TableHead>
                    <TableHead>Annual Commissions</TableHead>
                    <TableHead>Year-to-Date Commissions</TableHead>
                    <TableHead>Current Month Commissions</TableHead>
                    <TableHead>% of Total Commissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMonthData.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>${client.annualRevenue.toLocaleString()}</TableCell>
                      <TableCell>${client.yearToDateRevenue.toLocaleString()}</TableCell>
                      <TableCell>${client.annualCommissions.toLocaleString()}</TableCell>
                      <TableCell>${client.yearToDateCommissions.toLocaleString()}</TableCell>
                      <TableCell>${client.currentData?.commissions.toLocaleString()}</TableCell>
                      <TableCell>{(client.annualCommissions / totalAnnualCommissions * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
)
}

