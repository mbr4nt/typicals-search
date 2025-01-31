import { loadAndParseInputJson } from "./loadAndParseInputJson.js";

export async function addCmInfo(model) {
    if(map[model.partNumber]) {
        model.cmInfo = map[model.partNumber];
    }
    return model;
}

let cmInfo = await loadAndParseInputJson("cm-info.json");
let map = {};
for(let item of cmInfo) {
    map[item.partNumber] = item;
}