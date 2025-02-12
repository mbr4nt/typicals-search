export function cleanApplicationString(model) {
    // Use a regular expression to remove the two uppercase letters and the dash
    model.application =  model.application.replace(/^[A-Z]{2} - /, '');
    return model;
}