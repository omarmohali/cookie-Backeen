
function getStatusCodeFromError(err) {
    const errType = err.errors[Object.keys(err.errors)[0]].properties.type;
    var status;
    switch (errType) {
        case "unique":
            status = 409;
            break;
        case "required":
            status = 400;
            break;
        case "user defined":
            status = 400;
            break;
        default:
            status = 400;
    }

    return status;

}


module.exports = getStatusCodeFromError;