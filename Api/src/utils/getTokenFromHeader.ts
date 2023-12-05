function getTokenFromHeader(headers: any) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(" ")
        if (parted.length === 2) {
            return parted[1]
        }
        else  return null
    }
    return null
}

export default getTokenFromHeader