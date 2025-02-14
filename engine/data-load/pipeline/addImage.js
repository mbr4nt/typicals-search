export async function addImage(model) {
    let fsServerUrl = process.env.FS_SERVER_URL;
    let image = model.referenceImage.split('.')[0]; // Remove the file extension

    model.referenceImage = `${fsServerUrl}images/typicals/${image}.webp`;
    return model;
}
