import "@/app/_Styles/global.css";
import { Inter } from "next/font/google";
import { lazy } from "react";
import { AppProvider } from "./_Lib/AppProvider";
import Header from "./_Components/Header";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { auth, signOut } from "./_Lib/auth";
import { useSignOut } from "./_Lib/actions";
import { getTeachersInd } from "./_Lib/getTeachers";
import { getStudent } from "./_Lib/getStudent";
import { SpeedInsights } from "@vercel/speed-insights/next";
// const Profile = lazy(() => import("./_Components/Profile")); 
import Profile from "./_Components/Profile";
import Head from "next/head";
import Link from "next/link";
const inter = Inter({
  subsets: ["latin"],
});
export const metadata = {
  title: {
    template: "%s / UMS",
    default: "Welcome / UMS",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  const teacher =session?.user?.TeacherId? await getTeachersInd(session.user.email):null
  const student =session?.user?.TeacherId? await getStudent(session.user.email):null
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preload" href="./_Lib/Supabase" />
        <link rel="preload" href="./_Lib/getSubjects" />
        <link rel="preload" href="../_Lib/getAnnouncements" />
        <link rel="preload" href="../_Lib/getTimeTable" />
        <link rel="preload" href="../_Lib/getTeachersLeave" />
      </Head>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></Script>
      <Script
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></Script>
      <body className={inter.className}>
        <Toaster />
        <AppProvider>
          {session ? (
            <Header auth={session}>
              <form action={useSignOut}>
                <a href="#">
                  <button
                    className="material-icons-sharp"
                    style={{ backgroundColor: "transparent", border: "0" }}
                  >
                    logout
                  </button>

                  <h3>
                    <button
                      style={{ backgroundColor: "transparent", border: "0" }}
                    >
                      Logout
                    </button>
                  </h3>
                </a>
              </form>
            </Header>
          ) : null}

          <div className={` container`}>
            {session ? <Profile session={session} data={teacher} /> : null}
            {children}
            <SpeedInsights />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
