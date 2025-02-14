import { loadAndParseInputJson } from "./loadAndParseInputJson.js";

export async function addCmInfo(model) {
    if(map[model.code]) {
        model.cmInfo = map[model.code];
    }
    return model;
}

let cmInfo = await loadAndParseInputJson("cm-info.json");
let map = {};
let fsServerUrl = process.env.FS_SERVER_URL;
for(let item of cmInfo) {
    if (item.cmfav) {
        item.cmfav = `${fsServerUrl}cmfav/typicals/${item.cmfav}`;
    }
    map[item.code] = item;
}