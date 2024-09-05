// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { auth } from "./app/_Lib/auth";

export async function middleware(req) {
  const session = await auth();



   const restrictedRoutesForStudents = ["/educator-home", "/academicScheduler", "/educator-home/:path*"];
   const restrictedRoutesForTeachers = ["/", "/assignments", "/timetable"]; // Example routes

   const url = req.nextUrl.clone();

   // Check if the user is authenticated
   if (!session) {
     return NextResponse.redirect(new URL("/login", req.url));
   }

   // Log designation to debug
   const userDesignation = session.user?.Designation;
   console.log("User Designation:", userDesignation);

   // Block routes for students
   if (
   session && userDesignation === "Student"  &&
     restrictedRoutesForStudents.includes(url.pathname)
   ) {
     return NextResponse.redirect(new URL("/", req.url));
   }

   // Block routes for teachers
   if (
     session &&
     userDesignation === "Teacher" &&
     restrictedRoutesForTeachers.includes(url.pathname)
   ) {
     return NextResponse.redirect(new URL("/educator-home", req.url));
   }

   return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/academicScheduler",
    "/assignments",
    "/timetable",
    "/educator-home",
    "/educator-home/:path*",
  ],
};
