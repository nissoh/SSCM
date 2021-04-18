import { $text, Behavior, component, event, INode, style } from '@aelea/core'
import { $Button, $column, $Field, InputType, layoutSheet } from '@aelea/ui-components'
import { constant, filter, map, merge, now, sample, snapshot } from '@most/core'
import { Credentials, Keystore } from '../api/types'
import * as account from '../api/account'
import store from '../api/store'
import { Stream } from '@most/types'
import { pallete } from '@aelea/ui-components-theme'
import { $formAction, $link } from '../common/$elements'


const accountStore = store.account


export const $Startup = component((
  [sampleOk, ok]: Behavior<PointerEvent, PointerEvent>,
  [samplePassword, password]: Behavior<string, string>,
  [sampleLogin, login]: Behavior<Credentials, Credentials>,
  [sampleCancel, cancel]: Behavior<INode, PointerEvent>,
) => {

  const value = now('')
  const disabled = map(pw => !pw, merge(value, password))

  return [
    $column(layoutSheet.spacingBig, style({ alignItems: 'center', placeContent: 'center', padding: '0 26px' }))(
      $text(style({ fontSize: '110%' }))(`Welcome to \n Simple Secure Contact Manager`),

      accountStore.state
        ? $Login(ok, accountStore.state)({ login: sampleLogin(), password: samplePassword() })
        : $CreateAccount(ok)({ createAccount: sampleLogin(), password: samplePassword() }),

      $formAction(layoutSheet.spacingBig)(
        $Button({ $content: $text('OK'), disabled })({
          click: sampleOk()
        }),
        $link(sampleCancel(event('click')))(
          $text('Never!')
        )
      ),
    ),
      
    { login, cancel }
  ]
})



const $CreateAccount = (create: Stream<PointerEvent>) => component((
  [samplePassword, password]: Behavior<string, string>
) => {
  const submit = sample(password, create)
  const createAccount = account.create(submit)

  return [
    $column(style({ alignItems: 'center' }), layoutSheet.spacing)(
      $text(`Please enter a password for your new contact data file.`),
      $Field({ value: now(''), type: InputType.TEXT })({
        change: samplePassword(),
      })
    ),

    {
      createAccount,
      password
    }
  ]
})

const $Login = (login: Stream<PointerEvent>, keyStore: Keystore) => component((
  [samplePassword, password]: Behavior<string, string>
) => {

  const credentials = map(secret => ({ ...keyStore, secret, }), sample(password, login))
  const isValid = account.verify(credentials)
  const invalidLogin = map(valid => valid === null ? 'invalid Login' : null, isValid)
  const validationMessage = map(validity => validity ? validity : ' ', merge(merge(now(null), constant(null, password)), invalidLogin))

  return [

    $column(style({ alignItems: 'center' }), layoutSheet.spacing)(
      $text(`Please enter the password for your contact data file.`),
      $column(
        $Field({
          value: now(''),
          validation: (src) => snapshot((_, validation) => validation, src, invalidLogin)
        })({
          change: samplePassword(),
        }),
        $text(style({ whiteSpace: 'pre-wrap', fontSize: '75%', color: pallete.negative }))(validationMessage)
      )
    ),

    {
      login: filter(s => s !== null, isValid as Stream<Credentials>),
      password
    }
  
  ]
})

