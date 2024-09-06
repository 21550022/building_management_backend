import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from "typeorm"

@Entity()
@Tree("materialized-path")
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category
}