const validateEmail = (email: string) => {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patronEmail.test(email)
}

const validatePassword = (password: string) => {
    const patronPassword = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;

    return patronPassword.test(password);
}

const validateName = (name: string) => {
    var patronNombreCompleto = /^[a-zA-Z\s]{3,50}$/;

    return patronNombreCompleto.test(name);
}

const validateUserName = (userName: string) => {
    var patronNombreCompleto = /^[a-zA-Z0-9]{3,50}$/;

    return patronNombreCompleto.test(userName);
}

const isSamePassword = (password:string, confirmPassword:string) => {
    const samePassword = password === confirmPassword
    return samePassword
}

export {
    validateEmail,
    validatePassword,
    validateName,
    isSamePassword,
    validateUserName
}