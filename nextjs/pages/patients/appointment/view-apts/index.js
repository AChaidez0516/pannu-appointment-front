import { useEffect } from "react"
import ViewApts from "../../../../src/modules/patients.service.module/apt/view-apts/index"


function ViewAptsPage() {

  useEffect(() => {
    localStorage.removeItem('parentUrl')
  })
  return (
    <ViewApts />
  )
}

export default ViewAptsPage 
