import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

export type TaskStatus = "todo" | "doing" | "done";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text", default: "" })
  description!: string;

  @Column({ type: "varchar", default: "todo" })
  status!: TaskStatus;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user!: User;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "last_edited_at", type: "timestamptz" })
  lastEditedAt!: Date;
}