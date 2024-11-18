"use client";

import {Amplify} from "aws-amplify";
import {signUp} from "aws-amplify/auth";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

export default function App() {
    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        // ... validate inputs
        await signUp({
            username: form.elements.email.value,
            password: form.elements.password.value,
        });
    }

    return (
        <body className="h-screen bg-[var(--bg-3)] grid place-content-center">
            <form onSubmit={handleSubmit} className="grid place-content-center">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <input type="submit" />
            </form>
        </body>
    );
}
