import express from'express';
const router = express.Router();
import { userRoutes } from '../modules/user/user.route';

const modulerRoutes = [
    {path:'/',route:userRoutes}
]
modulerRoutes.forEach(route => router.use(route.path,route.route))
export default router;