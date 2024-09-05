import ProfileCard from "@/app/_Components/ProfileCard";
import { getTeachers } from "@/app/_Lib/getTeachers";

// Disable caching (optional, based on your needs)
export const revalidate = 0;

// Dynamic metadata generation based on the department parameter
export async function generateMetadata({ params }) {
  const department = params.department.toUpperCase();
  return {
    title: `  College-Info / ${department}`, // Set dynamic page title
    description: `Meet the faculty members of the ${department} department.`,
  };
}

async function Page({ params }) {
  let Teachers = await getTeachers();

  // Filter teachers based on the department parameter
  Teachers = Teachers.filter((item) => {
    return item?.Department === params.department;
  });

  return (
    <main style={{ gridColumn: "span 2" }}>
      <div
        style={{
          height: "25rem",
          backgroundColor: "#313E81",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h1 style={{ color: "white", fontSize: "3rem" }}>
          {params.department.toUpperCase()}
        </h1>
      </div>

      <div className="pro-grid">
        {Teachers.map((item, index) => {
          return <ProfileCard key={index} data={item} />;
        })}
      </div>
    </main>
  );
}

export default Page;
