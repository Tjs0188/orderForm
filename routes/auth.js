import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Initiate authentication with Azure AD
router.get(
  "/login",
  passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/",
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Handle the callback after authentication
router.get(
  "/azuread/callback",
  passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/",
    state: process.env.AZUREAD_OAUTH2_REDIRECT_URI,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});

export default router;
