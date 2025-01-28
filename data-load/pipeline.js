import { addUid } from "./pipeline/addUid.js";
import { processPropName } from "./pipeline/processPropName.js";
import { renameProp } from "./pipeline/renameProps.js";
export async function pipeline(model) {
    const steps = [
        processPropName,
        renameProp,
        addUid
    ];

    let processed = model;
    for (let step of steps) {
        processed = await step(processed);
    }
    return processed;
}