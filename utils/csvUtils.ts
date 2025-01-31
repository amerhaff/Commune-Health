export function downloadCSVTemplate() {
  const header = ['FirstName', 'LastName', 'Email', 'DateOfBirth', 'Address', 'City', 'State', 'ZipCode']
  const csvContent = header.join(',') + '\n'
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'employee_enrollment_template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

