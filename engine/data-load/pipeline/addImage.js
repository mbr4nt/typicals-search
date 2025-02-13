export async function addImage(model) {
    let imageServerUrl = process.env.IMAGE_SERVER_URL;
    let image = model.referenceImage.split('.')[0]; // Remove the file extension

    model.referenceImage = `${imageServerUrl}typicals/${image}.webp`;
    return model;
}
