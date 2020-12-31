interface CreateGameInterface {
    name: string,
    description: string,
    genres: string[],
    tags: string[],
    files: any
};

interface AddImagesInterface {
    gameId: string,
    files: any
}

interface RemoveImagesInterface {
    gameId: string,
    imageUrls: string[]
}

export {
    CreateGameInterface,
    AddImagesInterface,
    RemoveImagesInterface
};
