import { deleteData } from "./deleteData.js";
import { requestAndWait } from "./requestAndWait.js";

export async function indexData(typicals) {
    // /await deleteData();
    const index = {
        key: "typicals"
    };

    const url = `/indexes/${index.key}/documents`;
    const verb = "PUT";
    const body = typicals;
    const bearerToken = process.env.MEILI_MASTER_KEY;

    const filterableFields = [
        "industry",
        "application",
        "number",
        "mainProductLine",
        "secondaryProductLine",
        "seating"
    ]

    try {
        let response = await requestAndWait(url, verb, body, bearerToken);
        console.log("index response", response);
        response = await requestAndWait(`/indexes/${index.key}/settings/filterable-attributes`, "PUT", filterableFields, bearerToken);
        console.log("filterable-attributes response", response);

    } catch (error) {
        console.error("Request failed:", error.message);
    }
}
