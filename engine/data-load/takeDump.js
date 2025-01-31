import { requestAndWait } from "./requestAndWait.js";

export async function takeDump() {
    const url = `/dumps`;
    const verb = "POST";
    const bearerToken = "a0Mfp5S-WKAQ5_dtAARW3EopM6eij7u-OrrWo4JqTIk";

    try {
        const response = await requestAndWait(url, verb, null, bearerToken);
        console.log("dump response", response);
    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
