import { requestAndWait } from "./requestAndWait.js";

export async function deleteData() {
    
    const index = {
        key: "models"
    };

    const url = `/indexes/${index.key}`;
    const verb = "DELETE";
    const bearerToken = "a0Mfp5S-WKAQ5_dtAARW3EopM6eij7u-OrrWo4JqTIk";

    try {
        const response = await requestAndWait(url, verb, null, bearerToken);
        console.log("delete response", response);
    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
