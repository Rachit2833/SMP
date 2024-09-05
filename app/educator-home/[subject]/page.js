import { Suspense } from "react";
import Loading from "../../loading";
import AllSubSlide from "../../_Components/AllSubSlide";
import AssignmentSlab from "../../_Components/AssignmentSlab";
import EvaluationSlab from "../../_Components/EvaluationSlab";

// Set revalidate to 0 if you want no caching
export const revalidate = 0;

// Dynamic metadata generation based on params
export async function generateMetadata({ params }) {
  const sub = params.subject.replace(/%20/g, " "); // Replace URL encoded spaces

  return {
    title: `Educator-Home / ${sub}`, // Dynamic title using subject
    description: `Overview of assignments and evaluations for ${sub}.`, // Description including the subject
  };
}

function Page({ params }) {
  let sub = params.subject;
  sub = sub.replace(/%20/g, " "); // Replace URL encoded spaces in subject

  return (
    <div style={{ gridColumn: "span 2" }}>
      <h2>{sub}</h2> {/* Display the subject */}
      <main>
        <Suspense fallback={<Loading />}>
          <AssignmentSlab sub={sub} /> {/* Pass subject to AssignmentSlab */}
        </Suspense>
        <Suspense fallback={<Loading />}>
          <EvaluationSlab sub={sub} /> {/* Pass subject to EvaluationSlab */}
        </Suspense>
      </main>
    </div>
  );
}

export default Page;
