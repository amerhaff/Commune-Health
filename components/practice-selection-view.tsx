"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { PostSubmissionView } from "./post-submission-view"

interface PracticeSelectionViewProps {
  quote: any // Replace 'any' with the actual quote type
}

export function PracticeSelectionView({ quote }: PracticeSelectionViewProps) {
  const [showPreviousInfo, setShowPreviousInfo] = useState(false)

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{quote.practice.name}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Address</Label>
            <div>{quote.practice.address}</div>
          </div>
          <div>
            <Label>Phone</Label>
            <div>{quote.practice.phone}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Provider Information</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Years of Experience</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quote.practice.providers.map((provider: any) => (
              <TableRow key={provider.id}>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.specialty}</TableCell>
                <TableCell>{provider.yearsOfExperience}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Cost Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Monthly Cost</Label>
            <div className="text-2xl font-bold">${quote.monthlyCost.toFixed(2)}</div>
          </div>
          <div>
            <Label>Annual Cost</Label>
            <div className="text-2xl font-bold">${quote.annualCost.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setShowPreviousInfo(!showPreviousInfo)}>
          {showPreviousInfo ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Hide Previous Information
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show Previous Information
            </>
          )}
        </Button>
        <Button asChild>
          <Link href="/employer/enrollment/payment">Complete Enrollment</Link>
        </Button>
      </div>

      {showPreviousInfo && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <PostSubmissionView quote={quote} />
        </div>
      )}
    </div>
  )
}

