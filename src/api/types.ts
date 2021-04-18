
// perhaps an overkill, but maybe one day typescript will furhur improve on a strict literal strings (:
export type Password = string
export type Signature = string

export type Keystore = {
  signature: string
  publicKey: string
}

export type Credentials = Keystore & {
  secret: string
}

export type Contact = {
  name: string
  phone: string
  email: string
  address: string
  id?: number
}

