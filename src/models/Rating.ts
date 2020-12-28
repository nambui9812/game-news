import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class Rating {
    @Column()
    userId: string;

    @Column()
    username: string;

    @Column()
    score: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
};
