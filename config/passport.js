import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { OIDCStrategy } from "passport-azure-ad";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

const idmetadata = `${process.env.CLOUD_INSTANCE}/${process.env.AZURE_TENANT_ID}/.well-known/openid-configuration`;
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: idmetadata,
      clientID: process.env.AZUREAD_OAUTH2_CLIENT_ID,
      clientSecret: process.env.AZUREAD_OAUTH2_CLIENT_SECRET,
      redirectUrl:
        process.env.AZUREAD_OAUTH2_REDIRECT_URI + "/auth/azuread/callback",
      allowHttpForRedirectUrl: true,
      useCookieInsteadOfSession: false, // Use cookies for session management
      responseType: "code",
      responseMode: "query",
      scope: ["profile", "https://graph.microsoft.com/mail.read"], // Specify the required scopes
      //loggingLevel: "info", // Adjust logging level as needed
    },
    async function (profile, done) {
      try {
        const waadProfile = profile;
        // Find or create user in the database
        let user = await prisma.user.findUnique({
          where: { email: waadProfile.upn },
        });
        if (!user) {
          const userCount = await prisma.user.count();
          user = await prisma.user.create({
            data: {
              email: waadProfile.upn,
              name: waadProfile.displayName,
              password: randomUUID(),
              admin: userCount == 0,
              superAdmin: userCount == 0,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
