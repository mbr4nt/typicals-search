import { addCmInfo } from "./pipeline/addCmInfo.js";
import { addImage } from "./pipeline/addImage.js";
import { addUid } from "./pipeline/addUid.js";
import { processPropName } from "./pipeline/processPropName.js";
import { renameProp } from "./pipeline/renameProps.js";
export async function pipeline(model) {
    const steps = [
        processPropName,
        renameProp,
        addUid,
        addImage,
        addCmInfo
    ];

    let processed = model;
    for (let step of steps) {
        processed = await step(processed);
    }
    return processed;
}