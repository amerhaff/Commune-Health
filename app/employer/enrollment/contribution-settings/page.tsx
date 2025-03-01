"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function ContributionSettingsPage() {
  const router = useRouter()
  const [coverageStructure, setCoverageStructure] = useState("")
  const [flatRateFullCoverage, setFlatRateFullCoverage] = useState(false)
  const [flatRateAmount, setFlatRateAmount] = useState("")
  const [tieredContributions, setTieredContributions] = useState({
    employeeOnly: "",
    employeeSpouse: "",
    employeeChild: "",
    employeeFamily: "",
  })
  const [excludedEmployees, setExcludedEmployees] = useState({
    partTime: false,
    temporary: false,
    contract: false,
  })
  const [customCoverageType, setCustomCoverageType] = useState("")
  const [customFlatRateFullCoverage, setCustomFlatRateFullCoverage] = useState(false)
  const [customFlatRateAmount, setCustomFlatRateAmount] = useState("")
  const [customTieredContributions, setCustomTieredContributions] = useState({
    employeeOnly: "",
    employeeSpouse: "",
    employeeChild: "",
    employeeFamily: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [buttonText, setButtonText] = useState("Continue to Provider Selection")

  const validateForm = useCallback(() => {
    if (!coverageStructure) return false

    switch (coverageStructure) {
      case "flatRate":
        return flatRateFullCoverage || !!flatRateAmount
      case "tiered":
        return Object.values(tieredContributions).every((value) => !!value)
      case "custom":
        if (!customCoverageType) return false
        if (customCoverageType === "flatRate") {
          return customFlatRateFullCoverage || !!customFlatRateAmount
        } else {
          return Object.values(customTieredContributions).every((value) => !!value)
        }
      default:
        return false
    }
  }, [
    coverageStructure,
    flatRateFullCoverage,
    flatRateAmount,
    tieredContributions,
    customCoverageType,
    customFlatRateFullCoverage,
    customFlatRateAmount,
    customTieredContributions,
  ])

  useEffect(() => {
    setIsFormValid(validateForm())
  }, [validateForm])

  const searchParams = useSearchParams()
  const nextStep = searchParams.get("next")

  useEffect(() => {
    setButtonText(nextStep === "broker" ? "Continue to Broker Selection" : "Continue to Provider Selection")
  }, [nextStep]) // This line remains unchanged as it is necessary for the button text update

  const handleInputChange = useCallback(
    (setter) => (e) => {
      setter(e.target.value)
    },
    [],
  )

  const handleTieredInputChange = useCallback(
    (field) => (e) => {
      setTieredContributions((prev) => ({ ...prev, [field]: e.target.value }))
    },
    [],
  )

  const handleCustomTieredInputChange = useCallback(
    (field) => (e) => {
      setCustomTieredContributions((prev) => ({ ...prev, [field]: e.target.value }))
    },
    [],
  )

  const DollarInput = useCallback(
    ({ id, value, onChange }) => (
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
        <Input id={id} placeholder="Monthly contribution amount" value={value} onChange={onChange} className="pl-7" />
      </div>
    ),
    [],
  )

  const handleContinue = () => {
    if (isFormValid) {
      if (nextStep === "broker") {
        router.push("/employer/enrollment/broker")
      } else {
        router.push("/employer/enrollment/provider")
      }
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please fill out all required fields before proceeding.",
        variant: "destructive",
      })
    }
  }

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
              window.location.href = "/"
            }}
            className="rounded-full"
            style={{ backgroundColor: "#1400FF" }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contribution Settings</h1>
        <Button asChild variant="outline">
          <Link href="/employer/enrollment">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
      </div>

      <Card className="mb-6 overflow-hidden">
        <div className="w-full h-2" style={{ backgroundColor: "#1400FF" }} />
        <CardHeader>
          <CardTitle>Coverage Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={coverageStructure} onValueChange={setCoverageStructure}>
            <div className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value="flatRate" id="flatRate" />
              <Label htmlFor="flatRate">Flat Rate (All Employees Same Amount)</Label>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value="tiered" id="tiered" />
              <Label htmlFor="tiered">Tiered by Family Size</Label>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom Coverage Rules</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {coverageStructure === "flatRate" && (
        <Card className="mb-6 overflow-hidden">
          <div className="w-full h-2" style={{ backgroundColor: "#1400FF" }} />
          <CardHeader>
            <CardTitle>Flat Rate Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="fullCoverage" checked={flatRateFullCoverage} onCheckedChange={setFlatRateFullCoverage} />
                <Label htmlFor="fullCoverage">Cover Full Premium</Label>
              </div>
              {!flatRateFullCoverage && (
                <div>
                  <Label htmlFor="flatRateAmount">Monthly Contribution Amount</Label>
                  <DollarInput
                    id="flatRateAmount"
                    value={flatRateAmount}
                    onChange={handleInputChange(setFlatRateAmount)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {coverageStructure === "tiered" && (
        <Card className="mb-6 overflow-hidden">
          <div className="w-full h-2" style={{ backgroundColor: "#1400FF" }} />
          <CardHeader>
            <CardTitle>Tiered Contribution Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeOnly">Employee Only</Label>
                <DollarInput
                  id="employeeOnly"
                  value={tieredContributions.employeeOnly}
                  onChange={handleTieredInputChange("employeeOnly")}
                />
              </div>
              <div>
                <Label htmlFor="employeeSpouse">Employee + Spouse</Label>
                <DollarInput
                  id="employeeSpouse"
                  value={tieredContributions.employeeSpouse}
                  onChange={handleTieredInputChange("employeeSpouse")}
                />
              </div>
              <div>
                <Label htmlFor="employeeChild">Employee + Child</Label>
                <DollarInput
                  id="employeeChild"
                  value={tieredContributions.employeeChild}
                  onChange={handleTieredInputChange("employeeChild")}
                />
              </div>
              <div>
                <Label htmlFor="employeeFamily">Employee + Family</Label>
                <DollarInput
                  id="employeeFamily"
                  value={tieredContributions.employeeFamily}
                  onChange={handleTieredInputChange("employeeFamily")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {coverageStructure === "custom" && (
        <>
          <Card className="mb-6 overflow-hidden">
            <div className="w-full h-2" style={{ backgroundColor: "#1400FF" }} />
            <CardHeader>
              <CardTitle>Custom Coverage Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Exclude from coverage:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partTime"
                      checked={excludedEmployees.partTime}
                      onCheckedChange={(checked) =>
                        setExcludedEmployees({ ...excludedEmployees, partTime: checked as boolean })
                      }
                    />
                    <Label htmlFor="partTime">Part-time workers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="temporary"
                      checked={excludedEmployees.temporary}
                      onCheckedChange={(checked) =>
                        setExcludedEmployees({ ...excludedEmployees, temporary: checked as boolean })
                      }
                    />
                    <Label htmlFor="temporary">Temporary workers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="contract"
                      checked={excludedEmployees.contract}
                      onCheckedChange={(checked) =>
                        setExcludedEmployees({ ...excludedEmployees, contract: checked as boolean })
                      }
                    />
                    <Label htmlFor="contract">Contract workers</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 overflow-hidden">
            <div className="w-full h-2" style={{ backgroundColor: "#1400FF" }} />
            <CardHeader>
              <CardTitle>Coverage for Non-Excluded Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={customCoverageType} onValueChange={setCustomCoverageType}>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="flatRate" id="customFlatRate" />
                  <Label htmlFor="customFlatRate">Flat Rate (All Employees Same Amount)</Label>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="tiered" id="customTiered" />
                  <Label htmlFor="customTiered">Vary Coverage by Family Size</Label>
                </div>
              </RadioGroup>

              {customCoverageType === "flatRate" && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="customFullCoverage"
                      checked={customFlatRateFullCoverage}
                      onCheckedChange={setCustomFlatRateFullCoverage}
                    />
                    <Label htmlFor="customFullCoverage">Cover Full Premium</Label>
                  </div>
                  {!customFlatRateFullCoverage && (
                    <div>
                      <Label htmlFor="customFlatRateAmount">Monthly Contribution Amount</Label>
                      <DollarInput
                        id="customFlatRateAmount"
                        value={customFlatRateAmount}
                        onChange={handleInputChange(setCustomFlatRateAmount)}
                      />
                    </div>
                  )}
                </div>
              )}

              {customCoverageType === "tiered" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="customEmployeeOnly">Employee Only</Label>
                    <DollarInput
                      id="customEmployeeOnly"
                      value={customTieredContributions.employeeOnly}
                      onChange={handleCustomTieredInputChange("employeeOnly")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customEmployeeSpouse">Employee + Spouse</Label>
                    <DollarInput
                      id="customEmployeeSpouse"
                      value={customTieredContributions.employeeSpouse}
                      onChange={handleCustomTieredInputChange("employeeSpouse")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customEmployeeChild">Employee + Child</Label>
                    <DollarInput
                      id="customEmployeeChild"
                      value={customTieredContributions.employeeChild}
                      onChange={handleCustomTieredInputChange("employeeChild")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customEmployeeFamily">Employee + Family</Label>
                    <DollarInput
                      id="customEmployeeFamily"
                      value={customTieredContributions.employeeFamily}
                      onChange={handleCustomTieredInputChange("employeeFamily")}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <Button onClick={handleContinue} disabled={!isFormValid}>
        {buttonText}
      </Button>
    </div>
  )
}

