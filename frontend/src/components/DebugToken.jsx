// src/components/DebugToken.js
import React from "react";
import { useAuth } from "@clerk/clerk-react";

function DebugToken() {
    const { getToken } = useAuth();

    const showToken = async () => {
        try {
            const token = await getToken();
            console.log("Clerk JWT:", token); // copy this for testing
        } catch (err) {
            console.error("Error fetching token:", err);
        }
    };

    return (
        <button onClick={showToken}>
            Get Token
        </button>
    );
}

export default DebugToken;
