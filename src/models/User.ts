import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ database: 'main', name: 'users' })
export default class User {
    @ObjectIdColumn({ name: '_id' })
    id: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    role: number;

    @Column({ nullable: true })
    lastLogin: Date;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
