interface CreateUserInterface {
    email: string,
    username: string,
    password: string
};

interface ChangePasswordInterface {
    id: string,
    oldPassword: string,
    newPassword: string
}

interface AuthenticateInterface {
    username: string,
    password: string
}

export {
    CreateUserInterface,
    ChangePasswordInterface,
    AuthenticateInterface
};
