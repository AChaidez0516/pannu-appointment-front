import { useEffect } from "react";
import ViewApts from "../../../../src/modules/manual.module/apt/view-apts/index/index";

function ViewAptsPage() {
  useEffect(() => {
    localStorage.removeItem("parentUrl");
  });
  return <ViewApts />;
}

export default ViewAptsPage;
