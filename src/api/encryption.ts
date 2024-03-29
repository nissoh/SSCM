
// modified from
// https://github.com/bradyjoslin/encrypt-workers-kv/blob/master/src/index.ts

const enc = new TextEncoder()
const dec = new TextDecoder()

const base64_to_buf = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
const buff_to_base64 = (buff: Uint8Array) => btoa(String.fromCharCode(...buff))

const getPasswordKey = (password: string): PromiseLike<CryptoKey> =>
  crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveKey',
  ])

const deriveKey = (passwordKey: CryptoKey, salt: Uint8Array, keyUsage: CryptoKey['usages'], iterations = 10000): PromiseLike<CryptoKey> =>
  crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256',  },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage,
  )

export async function encryptData(secretData: string, password: string) {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16))
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const passwordKey = await getPasswordKey(password)
    const aesKey = await deriveKey(passwordKey, salt, ["encrypt"])
    const encryptedContent = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv, },
      aesKey,
      enc.encode(secretData)
    )
    const encryptedContentArr = new Uint8Array(encryptedContent)
    const buff: Uint8Array = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
    )
    buff.set(salt, 0)
    buff.set(iv, salt.byteLength)
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength)
    const base64Buff = buff_to_base64(buff)
    return base64Buff
  } catch (e) {
    throw new Error(`Error encrypting value: ${e.message}`)
  }
}

export async function decryptData(encryptedData: string, password: string) {
  try {
    const encryptedDataBuff = base64_to_buf(encryptedData)
    const salt = encryptedDataBuff.slice(0, 16)
    const iv = encryptedDataBuff.slice(16, 16 + 12)
    const data = encryptedDataBuff.slice(16 + 12)
    const passwordKey = await getPasswordKey(password)
    const aesKey = await deriveKey(passwordKey, salt, ["decrypt"])
    const decryptedContent = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv, },
      aesKey,
      data
    )
    return dec.decode(decryptedContent)
  } catch (e) {
    throw new Error(`Error decrypting value: ${e.message}`)
  }
}


