import { eq } from "drizzle-orm";
import { db } from ".";
import { comments, products, users, type NewUser, type NewProduct, type NewComment } from "./schema";



//users queries

export const createUser = async (data: NewUser ) => {
   const [user] = await db.insert(users).values(data).returning()
   return user;

};
export const getUserById = async(id: string) =>{
    return db.query.users.findFirst({
        where: eq(users.id,id)
    });

};


export const updateUser = async(id: string,data: Partial<NewUser>) => {
    const ExistingUser = await getUserById(id);
    if(!ExistingUser){
        throw new Error("User not found");
    }
    const [user] = await db.update(users).set(data).where(eq(users.id,id)).returning();
    return user;

}
// upsert is used to create or update a user
export const upsertUser = async(data: NewUser) => {

    const [user] = await db.insert(users).values(data).onConflictDoUpdate({
        target: users.id,
        set: data,
    }).returning();
    return user;
};
//products queries

export const createProduct = async(data: NewProduct) => {

    const [product] = await db.insert(products).values(data).returning();
    return product;
}
export const getProcutById = async(id: string) => {

    return db.query.products.findFirst({

        where: eq(products.id,id)
    });

}
export const getAllProducts = async() => {
    return db.query.products.findMany({
        with:{users:true},
        orderBy: (products, {desc}) => [desc(products.createdAt)]
    });
    
};
export const getProductsById = async (id: string) => {

    return db.query.products.findFirst({
        where: eq(products.id,id),
        with:{users:true,
        comments:{with:{users:true},
        orderBy: (comments, {desc}) => [desc(comments.createdAt)]},
        }
    });

};
export const getProductsByUserId = async (userId: string) => {
    return db.query.products.findMany({
        where: eq(products.userId,userId),
        with:{users:true},
        orderBy: (products, {desc}) => [desc(products.createdAt)]
    });
};
export const UpdateProduct = async (id: string,data: Partial<NewProduct>) => {

    const [product] = await db.update(products).set(data).where(eq(products.id,id)).returning();
    return product;

};

export const deleteProduct = async (id: string) => {

    const [product] = await db.delete(products).where(eq(products.id,id)).returning();
    return product;
    
}

//comments queries
export const createComment = async (data: NewComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
};

export const deleteComment = async (id: string) => {
    const [comment] = await db.delete(comments).where(eq(comments.id,id)).returning();
    return comment;
};

export const getCommentsById = async (id: string) => {
    return db.query.comments.findFirst({
        where: eq(comments.id,id),
        with:{users:true},
        orderBy: (comments, {desc}) => [desc(comments.createdAt)]
    });
};




    
