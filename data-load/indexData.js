import { deleteData } from "./deleteData.js";
import { requestAndWait } from "./requestAndWait.js";

export async function indexData(models) {
    // /await deleteData();
    const index = {
        key: "models"
    };

    const url = `/indexes/${index.key}/documents`;
    const verb = "PUT";
    const body = models;
    const bearerToken = "a0Mfp5S-WKAQ5_dtAARW3EopM6eij7u-OrrWo4JqTIk";

    try {
        const response = await requestAndWait(url, verb, body, bearerToken);
        console.log("index response", response);
        console.log(await requestAndWait(`/indexes/${index.key}/settings/filterable-attributes`, "PUT", ["category", "series"], bearerToken));
    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
