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

export {
    CreateUserInterface,
    ChangePasswordInterface
};
