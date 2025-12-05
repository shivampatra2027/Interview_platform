import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import {User} from "../models/user.model.js";

export const saveUser = async (req, res) => {
    console.log("saveUser route hit");

    try {
        const { userId } = getAuth(req);
        console.log("userId:", userId);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized - no userId" });
        }

        const clerkUser = await clerkClient.users.getUser(userId);
        console.log("Clerk user:", clerkUser);

        const userDoc = await User.findOneAndUpdate(
            { clerkId: userId },
            {
                clerkId: userId,
                email: clerkUser.emailAddresses[0]?.emailAddress,
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`,
            },
            { upsert: true, new: true }
        );

        console.log("User saved:", userDoc);
        res.json(userDoc);
    } catch (err) {
        
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};
