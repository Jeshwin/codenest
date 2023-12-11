import { getSession } from "@auth0/nextjs-auth0"
import { ManagementClient } from "auth0"
import "dotenv/config"
import { NextResponse } from "next/server"

export async function GET(_request) {
    const { user } = await getSession()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const userId = user.sub
        const management = new ManagementClient({
            domain: process.env.AUTH0_ISSUER_BASE_URL_NO_HTTP,
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
        })

        const response = await management.users.get({ id: userId })
        const userData = response.data
        const userMetadata = userData.user_metadata

        const responseBody = {
            createdAt: userData.created_at,
            username: userMetadata.username,
            profilePicture: userMetadata.pfp,
        }

        return NextResponse.json(responseBody, { status: 200 })
    } catch (error) {
        console.error("Error fetching user profile data:", error.message)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
