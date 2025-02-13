export async function addUid(model) {
    model.uid = model.code;
    return model;
}
