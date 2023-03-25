/**
 *
 * @param payload
 * @returns {{status: boolean}}
 */
exports.successResponse = (payload) => {
    return {
        status: true,
        payload
    }
}

/**
 *
 * @param payload
 * @returns {{status: boolean}}
 */
exports.failResponse = (payload = null) => {
    let response = {
        status: false,
    }

    if (payload) {
        response.payload = payload
    }

    return response
}
