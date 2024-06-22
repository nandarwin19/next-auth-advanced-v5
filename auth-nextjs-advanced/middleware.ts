import { auth } from "./app/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE:", req.nextUrl.pathname);
  console.log("IS LOGGEDIN", isLoggedIn);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
