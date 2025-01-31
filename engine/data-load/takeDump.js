import { requestAndWait } from "./requestAndWait.js";

export async function takeDump() {
    const url = `/dumps`;
    const verb = "POST";
    const bearerToken = process.env.MEILI_MASTER_KEY;

    try {
        const response = await requestAndWait(url, verb, null, bearerToken);
        console.log("dump response", response);
    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
