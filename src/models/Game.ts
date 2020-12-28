import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

import Rating from './Rating';

@Entity({ database: 'main', name: 'games' })
export default class Game {
    @ObjectIdColumn({ name: '_id' })
    id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    genres: string[];

    @Column({ nullable: false })
    tags: string[];

    @Column(type => Rating)
    @Column({ nullable: false })
    rating: Rating[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
