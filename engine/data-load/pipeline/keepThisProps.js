export async function keepThisProps(model) {
    return {
        industry: model.industry,
        application: model.application,
        number: model.number,
        code: model.code,
        referenceImage: model.referenceImage,
        mainProductLine: model.mainProductLine,
        secondaryProductLine: model.secondaryProductLine,
        seating: model.seating
    }
}
