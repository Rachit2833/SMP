import TimetableWrapper from "../_Components/TimetableWrapper";

export const metadata = {
  title: "Timetable",
};
function page() {
  return (
    <>
      <main style={{ gridColumn: "span 2" }}>
        <div className={`timetable active`} id="timetable">
         <TimetableWrapper />
        </div>
      </main>
    </>  
  );
}
export default page