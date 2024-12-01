import {Suspense} from "react";
import "./ide-theme.css";

export default function IDELayout({children}) {
    return (
        <body className="w-screen overflow-hidden h-screen bg-muted">
            <Suspense>{children}</Suspense>
        </body>
    );
}
