import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";
import { assert, string, number, object } from "superstruct";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const USER_TOKEN = "app-token";

const UserJwtPayload = object({
  pokemonDb: string(),
  jti: string(),
  iat: number(),
});

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyUserToken(token: string | undefined) {
  if (!token) {
    return { status: 401, message: "Missing user token" };
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );

    assert(verified.payload, UserJwtPayload);

    return verified.payload;
  } catch (err) {
    return { status: 401, message: "Your token is invalid." };
  }
}

const initial = () => `\$${Array.from({ length: 251 }, () => "x").join("")}`;

export const createUserToken = (pokemonDb?: string, jti?: string) =>
  new SignJWT({
    pokemonDb: pokemonDb || initial(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(jti || nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

type GuardCookieProps<OnGuarded = unknown, OnPass = unknown> = {
  token: string | undefined;
  onGuarded: (token: string) => OnGuarded;
  onPassThrough: () => OnPass;
};

/**
 * Adds the user token cookie to a response.
 */
export async function guardUserToken<OnGuarded = unknown, OnPass = unknown>({
  token,
  onPassThrough,
  onGuarded,
}: GuardCookieProps<OnGuarded, OnPass>) {
  if (!token) {
    const newToken = await createUserToken();
    return onGuarded(newToken);
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));

    return onPassThrough();
  } catch (e) {
    // dirty cookie
    const token = await createUserToken();
    return onGuarded(token);
  }
}
