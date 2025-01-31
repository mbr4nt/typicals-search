import { requestAndWait } from "./requestAndWait.js";

export async function deleteData() {
    
    const index = {
        key: "models"
    };

    const url = `/indexes/${index.key}`;
    const verb = "DELETE";
    const bearerToken = process.env.MEILI_MASTER_KEY;

    try {
        const response = await requestAndWait(url, verb, null, bearerToken);
        console.log("delete response", response);
    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
