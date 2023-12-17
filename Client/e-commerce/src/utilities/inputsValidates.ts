const validateEmail = (email: string) => {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patronEmail.test(email)
  }

  const validatePassword = (password: string) => {
    const patronPassword = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;

    return patronPassword.test(password);
  }

  export{
    validateEmail,
    validatePassword
  }