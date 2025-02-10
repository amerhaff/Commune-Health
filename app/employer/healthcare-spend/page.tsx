"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, DollarSign, Users } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { employerApi } from "@/utils/employer-api-client"

interface MonthlySpend {
  month: string
  amount: number
  employees: number
  dependents: number
}

const monthlyData: MonthlySpend[] = [
  { month: "January", amount: 12000, employees: 100, dependents: 20 },
  { month: "February", amount: 12500, employees: 105, dependents: 20 },
  { month: "March", amount: 13000, employees: 110, dependents: 20 },
  { month: "April", amount: 12800, employees: 108, dependents: 20 },
  { month: "May", amount: 13200, employees: 112, dependents: 20 },
  { month: "June", amount: 13500, employees: 115, dependents: 20 },
  { month: "July", amount: 13800, employees: 118, dependents: 20 },
  { month: "August", amount: 14000, employees: 120, dependents: 20 },
  { month: "September", amount: 14200, employees: 122, dependents: 20 },
  { month: "October", amount: 14500, employees: 125, dependents: 20 },
  { month: "November", amount: 14700, employees: 127, dependents: 20 },
  { month: "December", amount: 15000, employees: 130, dependents: 20 },
]

const years = ["2021", "2022", "2023"]

export default function HealthcareSpendPage() {
  const [spendData, setSpendData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());

  useEffect(() => {
    const fetchSpendData = async () => {
      try {
        const data = await employerApi.getHealthcareSpend(
          'current',
          selectedYear,
          selectedMonth
        );
        setSpendData(data);
      } catch (error) {
        console.error('Error fetching healthcare spend:', error);
      }
    };

    fetchSpendData();
  }, [selectedYear, selectedMonth]);

  const currentMonthData = useMemo(() => {
    return monthlyData.find(data => data.month === selectedMonth)
  }, [selectedMonth])

  const annualTotal = useMemo(() => {
    return monthlyData.reduce((total, month) => total + month.amount, 0)
  }, [])

  const yearToDateTotal = useMemo(() => {
    let total = 0
    for (const monthData of monthlyData) {
      if (monthData.month === selectedMonth) {
        total += monthData.amount
        break // Stop summing once the selected month is reached
      }
      total += monthData.amount
    }
    return total
  }, [selectedMonth])


  const totalEmployees = useMemo(() => {
    return monthlyData.reduce((total, month) => total + month.employees, 0)
  }, [])

  const totalDependents = useMemo(() => {
    return monthlyData.reduce((total, month) => total + month.dependents, 0)
  }, [])

  const totalEnrollees = useMemo(() => {
    return totalEmployees + totalDependents
  }, [totalEmployees, totalDependents])

  const chartData = useMemo(() => {
    return monthlyData.map(data => ({
      name: data.month,
      amount: data.amount
    }))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="border-b mb-8">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2" href="/">
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

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-black">Total Healthcare Spend</h1>
        <Button asChild variant="outline">
          <Link href="/employer/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Overview</TabsTrigger>
          <TabsTrigger value="monthly" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Monthly Breakdown</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader>
              <CardTitle>Healthcare Spend Trends</CardTitle>
              <CardDescription>
                Annual overview of healthcare spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Spend</p>
                      <p className="text-xl font-semibold">${annualTotal.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Year-to-Date Spend</p>
                      <p className="text-xl font-semibold">${yearToDateTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Enrollees</p>
                      <p className="text-xl font-semibold">{totalEnrollees}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Employees</p>
                      <p className="text-xl font-semibold">{totalEmployees}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Dependents</p>
                      <p className="text-xl font-semibold">{totalDependents}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      name="Monthly Spend"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Monthly Spend</CardTitle>
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
                    {monthlyData.map((data) => (
                      <SelectItem key={data.month} value={data.month}>
                        {data.month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {currentMonthData && (
                <>
                  <div className="text-2xl font-bold mb-4">
                    Total Spend: ${currentMonthData.amount.toLocaleString()}
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Membership Fees</TableCell>
                        <TableCell>
                          ${currentMonthData.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Employees: {currentMonthData.employees} | Dependents:{" "}
                      {currentMonthData.dependents}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

