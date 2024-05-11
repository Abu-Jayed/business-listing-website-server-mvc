import express from'express';
const router = express.Router();
import { userRoute } from '../modules/user/user.route';
import { authRouter } from '../modules/auth/auth.router';

const modulerRoutes = [
    {path:'/users',route:userRoute},
    {
        path:'/auth',route:authRouter
    }
]
modulerRoutes.forEach(route => router.use(route.path,route.route))
export default router;