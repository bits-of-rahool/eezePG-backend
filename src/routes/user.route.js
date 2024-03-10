import { Router } from "express";
import passport from "passport";
import { registerUser, loginUser, deleteUser,showUser,updateUser,allUser } from "../controllers/user.controller.js";
import { googleCallback, verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);

router.delete("/delete-user/:userId",verifyToken, deleteUser);

router.get('/all',verifyToken,allUser)

router.post("/login", passport.authenticate('local', { session: false }), loginUser);

router.get("/auth/google", passport.authenticate('google', { scope: ['email', 'profile'], session: false }));

router.get("/auth/google/callback", passport.authenticate('google', { session: false }), googleCallback);

router.get("/logout", (req, res) => {
  req.logout(() => {});
  res.clearCookie("token").send("logged out");
});

router.route('/:userID')
    .get(showUser)
    .put(updateUser);

export default router;
