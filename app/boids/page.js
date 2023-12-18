import TopBar from "@/components/homepage/topbar"
import BoidBackground from "@/components/homepage/boids/boidbackground"

export default function Page() {
    return (
        <body className="h-screen bg-[var(--light-bg-3)] dark:bg-[var(--dark-bg-3)]">
            <TopBar />
            <BoidBackground />
        </body>
    )
}
