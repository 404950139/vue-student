let writeResult = (status, msg, data) => {
    return JSON.stringify({
        status,
        msg,
        data
    });
};

let writeResultCount = (status, msg, data, count) => {
    return JSON.stringify({
        status,
        msg,
        data,
        count      
    });
};


module.exports = {
    writeResult,
    writeResultCount
};