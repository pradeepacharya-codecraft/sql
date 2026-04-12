// import 'reflect-metadata';  // 👈 add this
// import { TABLE_METADATA_KEY } from './table.decorator.js'

// export interface IBaseEntity {
//     id: number;
//     createdAt: Date;
//     createdBy: number;
//     updatedAt: Date;
//     updatedBy: number;
// }

// export abstract class BaseEntity implements IBaseEntity {
//     id: number;
//     createdAt: Date;
//     createdBy: number;
//     updatedAt: Date;
//     updatedBy: number;

//     constructor(entity: IBaseEntity) {
//         this.id = entity.id;
//         this.createdAt = entity.createdAt;
//         this.createdBy = entity.createdBy;
//         this.updatedAt = entity.updatedAt;
//         this.updatedBy = entity.updatedBy;
//     }

//     static getTableName(): string {
//         return Reflect.getMetadata(TABLE_METADATA_KEY, this);
//     }

//     async save(): Promise<void> {
//         const keys = Object.keys(this);
//         const columns = keys.join(', ');
//         const values_placeholder = "?, ".repeat(keys.length).slice(0, -2);
//         const query = `INSERT INTO ${(this.constructor as typeof BaseEntity).getTableName()} (${columns}) VALUES (${values_placeholder})`;
//         console.log(query);
//         // await db.execute(query, Object.values(this));
//     }

//     static async findById<T extends BaseEntity, I extends IBaseEntity>(
//         this: new (entity: I) => T,
//         id: number
//     ): Promise<T | null> {
//         const query = `SELECT * FROM ${Reflect.getMetadata(TABLE_METADATA_KEY, this)} WHERE id = ?`;
//         console.log(query);
//         // const result = await db.execute(query, [id]);
//         // const instance = new this(result[0]);
//         // return instance;
//         return null;
//     }

//     // TASKS:
//     // static async findAll<T extends BaseEntity, I extends IBaseEntity>(this: new (entity: I) => T): Promise<T[]>
//     // static async findOne<T extends BaseEntity, I extends IBaseEntity>(this: new (entity: I) => T, conditions: Partial<I>): Promise<T | null>
//     // static async deleteById<T extends BaseEntity, I extends IBaseEntity>(this: new (entity: I) => T): Promise<T[]>
//     // static async deleteAll<T extends BaseEntity, I extends IBaseEntity>(this: new (entity: I) => T): Promise<T[]>
//     // static async deleteOne<T extends BaseEntity, I extends IBaseEntity>(this: new (entity: I) => T, conditions: Partial<I>): Promise<T | null>
// }

import 'reflect-metadata';
import { TABLE_METADATA_KEY } from './table.decorator.js';

export interface IBaseEntity {
    id: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
}

export abstract class BaseEntity implements IBaseEntity {
    id: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;

    constructor(entity: IBaseEntity) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.createdBy = entity.createdBy;
        this.updatedAt = entity.updatedAt;
        this.updatedBy = entity.updatedBy;
    }

    static getTableName(): string {
        return Reflect.getMetadata(TABLE_METADATA_KEY, this);
    }

    async save(): Promise<void> {
        const tableName = (this.constructor as typeof BaseEntity).getTableName();
        const keys = Object.keys(this);
        const values = Object.values(this);

        if (this.id) {
            const setClause = keys.map(key => `${key} = ?`).join(', ');
            const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
            console.log(query);
            // await db.execute(query, [...values, this.id]);
        } else {
            const columns = keys.join(', ');
            const placeholders = "?, ".repeat(keys.length).slice(0, -2);
            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
            console.log(query);
            // await db.execute(query, values);
        }
    }

    static async findById<T extends BaseEntity, I extends IBaseEntity>(
        this: new (entity: I) => T,
        id: number
    ): Promise<T | null> {
        const tableName = Reflect.getMetadata(TABLE_METADATA_KEY, this);
        const query = `SELECT * FROM ${tableName} WHERE id = ?`;
        console.log(query);
        // const result = await db.execute(query, [id]);
        // return new this(result[0]);
        return null;
    }

    static async findAll<T extends BaseEntity, I extends IBaseEntity>(
        this: new (entity: I) => T
    ): Promise<T[]> {
        const tableName = Reflect.getMetadata(TABLE_METADATA_KEY, this);
        const query = `SELECT * FROM ${tableName}`;
        console.log(query);
        // const results = await db.execute(query, []);
        // return results.map((row: I) => new this(row));
        return [];
    }

    static async findOne<T extends BaseEntity, I extends IBaseEntity>(
        this: new (entity: I) => T,
        conditions: Partial<I>
    ): Promise<T | null> {
        const tableName = Reflect.getMetadata(TABLE_METADATA_KEY, this);
        const keys = Object.keys(conditions);
        const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
        const query = `SELECT * FROM ${tableName} WHERE ${whereClause} LIMIT 1`;
        console.log(query);
        // const results = await db.execute(query, Object.values(conditions));
        // if (results.length === 0) return null;
        // return new this(results[0]);
        return null;
    }

    static async deleteById<T extends BaseEntity, I extends IBaseEntity>(
        this: new (entity: I) => T,
        id: number
    ): Promise<void> {
        const tableName = Reflect.getMetadata(TABLE_METADATA_KEY, this);
        const query = `DELETE FROM ${tableName} WHERE id = ?`;
        console.log(query);
        // await db.execute(query, [id]);
    }

    static async deleteAll<T extends BaseEntity, I extends IBaseEntity>(
        this: new (entity: I) => T
    ): Promise<void> {
        const tableName = Reflect.getMetadata(TABLE_METADATA_KEY, this);
        const query = `DELETE FROM ${tableName}`;
        console.log(query);
        // await db.execute(query, []);
    }

    static async deleteOne<T extends BaseEntity, I extends IBaseEntity>(
        this: new (entity: I) => T,
        conditions: Partial<I>
    ): Promise<void> {
        const tableName = Reflect.getMetadata(TABLE_METADATA_KEY, this);
        const keys = Object.keys(conditions);
        const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
        const query = `DELETE FROM ${tableName} WHERE ${whereClause} LIMIT 1`;
        console.log(query);
        // await db.execute(query, Object.values(conditions));
    }
}