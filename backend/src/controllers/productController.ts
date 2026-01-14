import type { Request, Response} from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";
import { products } from "../db/schema";

export const getAllProducts = async(req: Request,res: Response) => {

    try{
        const products = await queries.getAllProducts();
        res.status(200).json(products);


    }catch (error){
        console.error("Error getting products:", error);
        res.status(500).json({error: "Failed to get products"});

    }
};

export const getProductById = async (req: Request,res: Response) =>{

    try{
        const {id} = req.params;
        const product = await queries.getProductsById(id);

        if(!product) return res.status(404).json({error:"Product not found!"})

        res.status(200).json(product);
        

    }catch (error){
        console.error("Error getting product:", error);
        res.status(500).json({error: "Failed to get product"});
    }

};



export const getMyproduct = async (req: Request,res:Response) => {

    try{
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({
            error:"User not Authorized"
        })
        const productsList = await queries.getProductsByUserId(userId);
        res.status(200).json(productsList);
    
    }catch (error){
        console.error("Error getting user products:", error);
        res.status(500).json({
            error:"Failed to get products"
        });
    };
};

        


export const createProduct = async (req: Request, res:Response) => {
    try{
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({
            error:"User not Authorized"
        })
        const{title,description,imageUrl} = req.body;

        if(!title || !description || !imageUrl){
            res.status(400).json({
                error: "Title, description and Image are required"
            });
            return;
        }
        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        });
        res.status(201).json(product)
    }catch (error){
        console.error("Error creating a Product", error)
        res.status(500).json({error:"Error creating a product."})
    }
};

export const updateProduct = async (req:Request, res:Response) =>{

    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({
            error:"User not Authorized"
        })
        const {id} = req.params
        const { title, description, imageUrl} = req.body;


        const existingProduct = await queries.getProductsById(id);
        if(!existingProduct){
            res.status(404).json({
                error: "Product not found" 
            });
            return;
        }
        if (existingProduct.userId !== userId){
            res.status(403).json({
                error:"You can only update your own products" });
                return;
        }
        const product = await queries.updateProduct(id,{
            title,
            description,
            imageUrl
        });
        res.status(200).json(product)
            
        
    } catch (error) {
        console.error("Error updating the product",error);
        res.status(500).json({error:"Error updating the product"});
            
        
    }

};
export const deleteProduct = async (req:Request, res:Response) => {
    try {
        const{ userId} = getAuth(req);
         if(!userId) return res.status(401).json({
            error:"User not Authorized"
        });
        const {id} = req.params;
        

        const existingProduct = await queries.getProductsById(id);
        if(!existingProduct){
            res.status(404).json({
                error: "Product not found" 
            });
            return;
        };

          if (existingProduct.userId !== userId){
            res.status(403).json({
                error:"You can only deleteyour own products" });
                return;
        };

        await queries.deleteProduct(id);
        res.status(200).json({
            message:"Deleted Succesfully"
        });
            
    } catch (error) {
        console.error("Error deleting a product!", error)
        res.status(500).json({
            error:"Error deleting a product"
        })
        
    }
}
    

