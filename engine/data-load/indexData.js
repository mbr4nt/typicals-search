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
    const bearerToken = process.env.MEILI_MASTER_KEY;

    try {
        let response = await requestAndWait(url, verb, body, bearerToken);
        console.log("index response", response);
        response = await requestAndWait(`/indexes/${index.key}/settings/filterable-attributes`, "PUT", ["category", "series"], bearerToken);
        console.log("filterable-attributes response", response);

    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
