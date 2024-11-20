import {NextRequest, NextResponse} from "next/server";
import {fetchAuthSession} from "aws-amplify/auth/server";
import {runWithAmplifyServerContext} from "@/utils/amplifyServerUtils";

// 1. Specify protected and public routes
const protectedRoutes = ["/codespace"];
const publicRoutes = ["/register", "/login", "/"];

export default async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 1. Check if the current route is protected or public
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 2. Check if the user is authenticated
    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: {request, response},
        operation: async contextSpec => {
            try {
                const session = await fetchAuthSession(contextSpec);
                return (
                    session.tokens?.accessToken !== undefined &&
                    session.tokens?.idToken !== undefined
                );
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    });

    console.log("Authenticated? ", authenticated);

    // 3. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !authenticated) {
        return NextResponse.redirect(new URL("/register", request.nextUrl));
    }

    // 4. Redirect to /codespace if the user is authenticated
    if (isPublicRoute && authenticated) {
        return NextResponse.redirect(new URL("/codespace", request.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
