"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usStates } from "@/utils/us-states"
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils"

interface EmployerFormData {
  name: string
  industry: string
  employeeCount: number
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
}

interface AddEmployerFormProps {
  onSubmit: (employerData: EmployerFormData) => void
}

export function AddEmployerForm({ onSubmit }: AddEmployerFormProps) {
  const [formData, setFormData] = useState<EmployerFormData>({
    name: "",
    industry: "",
    employeeCount: 0,
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: "",
      industry: "",
      employeeCount: 0,
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
    })
  }

  return (
    <DialogContent>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="relative rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select name="industry" value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeCount">Number of Employees</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                value={formData.employeeCount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite (optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select name="state" value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Add Employer</Button>
          </form>
        </div>
      </ScrollArea>
    </DialogContent>
  )
}

