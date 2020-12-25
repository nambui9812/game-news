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

interface ChangeRoleInterface {
    role: number,
    userId: string,
    newUserRole: number
}

export {
    CreateUserInterface,
    ChangePasswordInterface,
    AuthenticateInterface,
    ChangeRoleInterface
};
