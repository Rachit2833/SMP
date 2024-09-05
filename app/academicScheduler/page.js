import "@/app/_Styles/Assignment.css";
import "@/app/_Styles/cal.css";
import { Toaster } from "react-hot-toast";
import CalWrapper from "../_Components/CalWrapper";
import { getClassesInd } from "../_Lib/getClassesInd";
import { getExtraClasses } from "../_Lib/getExtraClasses";
import { getExtraEvent } from "../_Lib/getExtraEvents";
import { Suspense } from "react";
export const revalidate = 0;
export const metadata = {
  title:  "Academic-Scheduler",
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
async function Page() {
const [classes, extraClasse, events] = await Promise.all([
      getClassesInd(),
      getExtraClasses(),
      getExtraEvent(),
   ]);
  return (
    <>
      <Toaster />
      <Suspense fallback={<p style={{ fontSize: "2rem" }}>Loading...</p>}>
        <CalWrapper
          classes={classes}
          events={events}
          extraClasse={extraClasse}
        />
      </Suspense>
    </>
  );
  
}

export default Page;
