"use client"

import { useState, useEffect } from "react"
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
import { ArrowLeft, DollarSign, Users, Calendar, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { cn } from "@/lib/utils"
import { providerApi } from "@/utils/api-client"

interface MonthlyData {
month: string;
revenue: number;
enrollees: number;
}

interface EmployerRevenue {
id: string;
name: string;
monthlyData: MonthlyData[];
annualRevenue: number;
yearToDateRevenue: number;
}

export default function ProviderRevenuePage() {
const [selectedMonth, setSelectedMonth] = useState("December")
const [selectedYear, setSelectedYear] = useState("2023")
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const years = ["2021", "2022", "2023"]

const [employerRevenues] = useState<EmployerRevenue[]>([
  {
    id: "1",
    name: "TechCorp Inc.",
    monthlyData: months.map((month, index) => ({
      month,
      revenue: 5000 + (index * 200),
      enrollees: 50 + (index * 2)
    })),
    annualRevenue: 78000,
    yearToDateRevenue: 65000
  },
  {
    id: "2",
    name: "HealthCare Solutions",
    monthlyData: months.map((month, index) => ({
      month,
      revenue: 7500 + (index * 300),
      enrollees: 75 + (index * 3)
    })),
    annualRevenue: 117000,
    yearToDateRevenue: 97500
  },
  {
    id: "3",
    name: "EduLearn Systems",
    monthlyData: months.map((month, index) => ({
      month,
      revenue: 3000 + (index * 150),
      enrollees: 30 + (index * 1)
    })),
    annualRevenue: 46800,
    yearToDateRevenue: 39000
  },
]);

const currentMonthData = employerRevenues.map(employer => ({
  ...employer,
  currentData: employer.monthlyData.find(data => data.month === selectedMonth)
}));

const totalMonthlyRevenue = currentMonthData.reduce(
  (sum, employer) => sum + (employer.currentData?.revenue || 0),
  0
);

const totalAnnualRevenue = employerRevenues.reduce(
  (sum, employer) => sum + employer.annualRevenue,
  0
);

const totalYearToDateRevenue = employerRevenues.reduce(
  (sum, employer) => sum + employer.yearToDateRevenue,
  0
);

const totalEnrollees = currentMonthData.reduce(
  (sum, employer) => sum + (employer.currentData?.enrollees || 0),
  0
);

const revenueGrowth = 15.5; // Example growth percentage
const enrolleeGrowth = 8.2; // Example growth percentage

const chartData = months.map(month => ({
  name: month,
  revenue: employerRevenues.reduce((sum, employer) => {
    const monthData = employer.monthlyData.find(data => data.month === month);
    return sum + (monthData?.revenue || 0);
  }, 0),
  enrollees: employerRevenues.reduce((sum, employer) => {
    const monthData = employer.monthlyData.find(data => data.month === month);
    return sum + (monthData?.enrollees || 0);
  }, 0),
}));

const [revenueData, setRevenueData] = useState(null);

useEffect(() => {
  const fetchRevenueData = async () => {
    try {
      const data = await providerApi.getRevenueMetrics(
        'current',
        selectedYear,
        selectedMonth
      );
      setRevenueData(data);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      // Add error handling UI
    }
  };

  fetchRevenueData();
}, [selectedYear, selectedMonth]);

return (
  <div className="flex flex-col min-h-screen">
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link className="flex items-center space-x-2" href="/provider/home">
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
        <h1 className="text-3xl font-bold">Revenue Overview</h1>
        <Button asChild variant="outline">
          <Link href="/provider/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium z-10">Annual Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
          </CardHeader>
          <CardContent>
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <div className="text-2xl font-bold">${totalAnnualRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {revenueGrowth >= 0 ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-blue-600" /> {/* Blue icon */}
                  {revenueGrowth}% from last year
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-blue-600" /> {/* Blue icon */}
                  {Math.abs(revenueGrowth)}% from last year
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium z-10">Year-to-Date Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
          </CardHeader>
          <CardContent>
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <div className="text-2xl font-bold">${totalYearToDateRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">As of {selectedMonth} {selectedYear}</p>
          </CardContent>
        </Card>
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium z-10">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
          </CardHeader>
          <CardContent>
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <div className="text-2xl font-bold">${totalMonthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For {selectedMonth} {selectedYear}</p>
          </CardContent>
        </Card>
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium z-10">Total Enrollees</CardTitle>
            <Users className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
          </CardHeader>
          <CardContent>
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <div className="text-2xl font-bold">{totalEnrollees}</div>
            <p className="text-xs text-muted-foreground">
              {enrolleeGrowth >= 0 ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-blue-600" /> {/* Blue icon */}
                  {enrolleeGrowth}% from last month
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-blue-600" /> {/* Blue icon */}
                  {Math.abs(enrolleeGrowth)}% from last month
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
          <TabsTrigger value="employer" className="data-[state=active]:bg-black data-[state=active]:text-white">Employer Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <Card>
              <CardHeader>
                <CardTitle className="z-10">Revenue and Enrollee Trends</CardTitle>
                <CardDescription className="z-10">Annual overview of revenue and enrollee growth</CardDescription>
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
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="enrollees" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Monthly Revenue</CardTitle>
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
                <div className="text-2xl font-bold mb-4">${totalMonthlyRevenue.toLocaleString()}</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employer</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Enrollees</TableHead>
                      <TableHead>% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMonthData.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell className="font-medium">{employer.name}</TableCell>
                        <TableCell>${employer.currentData?.revenue.toLocaleString()}</TableCell>
                        <TableCell>{employer.currentData?.enrollees}</TableCell>
                        <TableCell>{((employer.currentData?.revenue || 0) / totalMonthlyRevenue * 100).toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="employer">
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Employer</CardTitle>
                <CardDescription>Detailed breakdown of revenue and enrollees by employer</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employer</TableHead>
                      <TableHead>Annual Revenue</TableHead>
                      <TableHead>Year-to-Date Revenue</TableHead>
                      <TableHead>Current Month Revenue</TableHead>
                      <TableHead>Current Month Enrollees</TableHead>
                      <TableHead>% of Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMonthData.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell className="font-medium">{employer.name}</TableCell>
                        <TableCell>${employer.annualRevenue.toLocaleString()}</TableCell>
                        <TableCell>${employer.yearToDateRevenue.toLocaleString()}</TableCell>
                        <TableCell>${employer.currentData?.revenue.toLocaleString()}</TableCell>
                        <TableCell>{employer.currentData?.enrollees}</TableCell>
                        <TableCell>{(employer.annualRevenue / totalAnnualRevenue * 100).toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  </div>
)
}

