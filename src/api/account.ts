import { O } from "@aelea/core"
import { awaitPromises, map } from "@most/core"
import * as bls from 'noble-bls12-381'
import { Password, Credentials } from "./types"

const enc = new TextEncoder()

function toHex(buffer: Uint8Array): string {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function randomHex() {
  const arr = window.crypto.getRandomValues(new Uint8Array(32))
  return toHex(arr)
}

export const create = O(
  map(async (secret: Password) => {
    const message = enc.encode(secret)
    const privateKey = randomHex()
    const publicKey = bls.getPublicKey(privateKey) as string
    const signatureBuffer = await bls.sign(message, privateKey)
    const signature = toHex(signatureBuffer)

    const credentials: Credentials = { signature, publicKey, secret }
    return credentials
  }),
  awaitPromises,
)

export const verify = O(
  map(async (credentials: Credentials) => {
    const message = enc.encode(credentials.secret)

    const isValid = await bls.verify(credentials.signature, message, credentials.publicKey).catch(() => null)

    return isValid ? credentials : null
  }),
  awaitPromises,
)



