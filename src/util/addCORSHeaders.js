
module.exports = function addCorsHeaders(request, reply) {
    if (!request.headers.origin) {
        return reply.continue;
    }

    var response = request.response.isBoom ? request.response.output : request.response;

    response.headers['access-control-allow-origin'] = request.headers.origin;
    response.headers['access-control-allow-credentials'] = 'true';
    if (request.method !== 'options') {
        return reply.continue;
    }

    response.statusCode = 200;
    response.headers['access-control-expose-headers'] = 'content-type, content-length, etag';
    response.headers['access-control-max-age'] = 60 * 10;
    if (request.headers['access-control-request-headers']) {
        response.headers['access-control-allow-headers'] = request.headers['access-control-request-headers'];
    }
    if (request.headers['access-control-request-method']) {
        response.headers['access-control-allow-methods'] = request.headers['access-control-request-method'];
    }

    return reply.continue;
};
