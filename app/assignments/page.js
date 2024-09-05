import { Inter } from "next/font/google";
import "@/app/_Styles/Assignment.css";
import { Suspense } from "react";
import PanelWrapper from "../_Components/PanelWrapper";
import SubjectSlide from "../_Components/SubjectSlide";
import Loading from "../loading";
export const revalidate = 0;
const inter = Inter({
  subsets: ["latin"],
});
export const metadata = {
  title: "Assignments",
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
async function page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <main className={inter.className}>
          <SubjectSlide />
        </main>
      </Suspense>
      <div>
        <div style={{}} className="right">
          <PanelWrapper />
        </div>
      </div>
    </>
  );
}

export default page;
