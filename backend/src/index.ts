import express from "express";
import { ENV } from "./config/env";


const app = express();


app.get("/", (req, res) => {
    res.json({ message: "Hello World!" 
        ,
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        }
    });
});


app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});