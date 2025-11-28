// frontend/src/api/index.js
import api from "./axios";
import { clerkClient, useClerk, useAuth } from "@clerk/clerk-react";


export async function authRequest(config = {}) {
  const { getToken } = await import("@clerk/clerk-react");
  const token = await getToken({ template: "default" }); 
  return api({
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: token ? `Bearer ${token}` : undefined
    }
  });
}
