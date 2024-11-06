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
      scope: ["openid", "profile", "email", "User.Read"], // Specify the required scopes
      //loggingLevel: "info", // Adjust logging level as needed
    },
    async function (iss, sub, profile, accessToken, refreshToken, done) {
      try {
        const waadProfile = profile;
        console.log(accessToken);
        // Fetch additional user information from Microsoft Graph
        const graphResponse = await fetch(
          "https://graph.microsoft.com/v1.0/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const additionalInfo = await graphResponse.json();

        // Now you have more information about the user
        console.log(additionalInfo);
        console.log(profile);
        // Find or create user in the database
        let user = await prisma.user.findUnique({
          where: { email: waadProfile.upn },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: waadProfile.upn,
              name: waadProfile.displayName,
              password: randomUUID(),
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
