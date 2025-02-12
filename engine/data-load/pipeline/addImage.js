export async function addImage(model) {
    let imageServerUrl = process.env.IMAGE_SERVER_URL;
    model.image = `${imageServerUrl}typicals/${model.partNumber}.webp`;
    return model;
}
