export async function addImage(model) {
    let imageServerUrl = "http://localhost:3002/";
    model.image = `${imageServerUrl}models/${model.partNumber}.jpg`;
    return model;
}
