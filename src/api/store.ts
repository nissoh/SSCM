import { O, Op } from "@aelea/core"
import { state } from "@aelea/ui-components"
import { awaitPromises, map } from "@most/core"
import { decryptData, encryptData } from "./encryption"
import { Contact,  Credentials, Keystore } from "./types"

const root = state.localStorageTreeFactory('_store')
const account = root<null | Keystore>('account', null)
const contacts = root<null | string>('contacts', null)

const storeAccount = account.store(
  O(
    map(async ({ publicKey, signature }: Credentials) => {
      return { publicKey, signature }
    }),
    awaitPromises
  ) // mapping ensures we do not store secret(password)
)
const encryptContactList = contacts.store(
  O(
    map(async ({ contactList, credentials }: { credentials: Credentials, contactList: Contact[] }) => {
      const data = JSON.stringify(contactList)
      const encrypted = await encryptData(data, credentials.secret)

      return encrypted
    }),
    awaitPromises
  )
)

export const decryptContactList: Op<Credentials, Contact[]> = O(
  map(async (creds: Credentials) => {
    if (account.state) {
      const data: Contact[] = contacts.state ? JSON.parse(await decryptData(contacts.state, creds.secret)) : []
      return data
    }
    return []
  }),
  awaitPromises,
)




export default { root, account, contacts, storeAccount, decryptContactList, encryptContactList }

