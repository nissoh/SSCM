import { $node, $text, Behavior, component, event, IBranch, style, StyleCSS } from '@aelea/core'
import { $Button, $column, $TextField, layoutSheet, state } from '@aelea/ui-components'
import { constant, map, now, sample, startWith } from '@most/core'
import { Contact } from '../api/types'
import { $formAction, $link } from '../common/$elements'
import { fadeIn } from '../transitions/enter'

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/
  return re.test(email) ? null : 'Invalid'
}


export const $ContactEditor = (givenContact: Contact) => component((
  [sampleName, name]: Behavior<string, string>,
  [sampleEmail, email]: Behavior<string, string>,
  [samplePhone, phone]: Behavior<string, string>,
  [sampleAddress, address]: Behavior<string, string>,
  [sampleSave, save]: Behavior<PointerEvent, Contact>,
  [sampleCancel, cancel]: Behavior<IBranch, Contact>,
) => {

  const contact = state.combineState(givenContact, { name, email, address, phone })

  const hasName = map(x => {
    return x.name.length === 0
  }, contact)
  const disableSave = startWith(true, hasName)

  const labelStyle: StyleCSS =  { width: '85px' }

  const cancelBehavior = sampleCancel(
    event('click'),
    constant(givenContact)
  )
  return [
    $column(fadeIn, style({ minWidth: '70%' }), layoutSheet.spacingBig)( // searcg type attribute prevents chrome's autocomplete
      $TextField({ label: 'Name', value: now(givenContact.name), labelStyle, type: 'search' as any })({ change: sampleName() }),
      $TextField({ label: 'Email', value: now(givenContact.email), labelStyle, hint: 'Valid email addresses. e.g. simple@example.com', validation: map(validateEmail) })({ change: sampleEmail() }),
      $TextField({ label: 'Phone', value: now(givenContact.phone), labelStyle,  type: 'search' as any })({ change: samplePhone() }),
      $TextField({ label: 'Address', value: now(givenContact.address), labelStyle, type: 'search' as any })({ change: sampleAddress() }),

      $node(),

      $formAction(
        $Button({ $content: $text('Save'), disabled: disableSave })({
          click: sampleSave(
            sample(contact)
          )
        }),
        $link(cancelBehavior)(
          $text('Cancel')
        ),
      ),
    ),
      
    {
      save,
      cancel
    }
  ]
})


