import { addCmInfo } from "./pipeline/addCmInfo.js";
import { addImage } from "./pipeline/addImage.js";
import { addUid } from "./pipeline/addUid.js";
import { processPropName } from "./pipeline/processPropName.js";
import { renameProp } from "./pipeline/renameProps.js";
import { deleteSomeProps } from "./pipeline/deleteSomeProps.js";
export async function pipeline(model) {
    const steps = [
        processPropName,
        deleteSomeProps,
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