import axios from "axios";

export const saveUser = async () => {
    try {
        const res = await axios.post("http://localhost:5002/api/users/save-user");
        return res.data;
    } catch (err) {
        console.error("Error saving user:", err);
        throw err;
    }
};
