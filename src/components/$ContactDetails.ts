import { $node, $text, component, style } from '@aelea/core'
import { $column, $row, layoutSheet } from '@aelea/ui-components'
import { pallete } from '@aelea/ui-components-theme'
import { Contact } from '../api/types'
import { fadeIn } from '../transitions/enter'



const fieldDisplay = (label: string, value: string) => $row(layoutSheet.spacingSmall)(
  $text(style({ color: pallete.description, minWidth: '30%' }))(label),
  $text(value)
)

export const $ContactDetails = (contact: Contact) => component((
) => {
  return [
    $column(fadeIn, layoutSheet.spacingBig, style({ minWidth: '70%' }))(
      $text(style({ fontSize: '120%', textAlign: 'center' }))(contact.name),
      $node(),
      $column(
        fieldDisplay('Phone: ', contact.phone),
        fieldDisplay('Email: ', contact.email),
      ),

      fieldDisplay('Address: ', contact.address),
    )
  ]
})


