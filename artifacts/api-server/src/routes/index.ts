import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import storiesRouter from "./stories";
import sessionsRouter from "./sessions";
import aiRouter from "./ai";
import premiumRouter from "./premium";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(storiesRouter);
router.use(sessionsRouter);
router.use(aiRouter);
router.use(premiumRouter);

export default router;
