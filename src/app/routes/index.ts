import express from'express';
const router = express.Router();
import { userRoute } from '../modules/user/user.route';

const modulerRoutes = [
    {path:'/',route:userRoute}
]
modulerRoutes.forEach(route => router.use(route.path,route.route))
export default router;