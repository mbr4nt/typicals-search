export async function addUid(model) {
    model.uid = model.partNumber;
    return model;
}
