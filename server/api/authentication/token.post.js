import { OAuth2Client } from "google-auth-library";

const googleClientID =
  "1044712585347-ctp0cq62k0ljekp1q1bka7u390g1sv8d.apps.googleusercontent.com";
const client = new OAuth2Client(googleClientID);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = body.token;
  const user = verify(token).catch(console.error);
  return user;
});

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: googleClientID,
  });
  const payload = ticket.getPayload();
  return payload;
}
