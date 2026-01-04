import {Router} from "express"
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";


const router = Router();

// api/users/sync user from clerk to DB

router.post("/sync", requireAuth,syncUser);




export default router;