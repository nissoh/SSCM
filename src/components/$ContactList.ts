import { $text, Behavior, component, event, INode, style, styleBehavior } from '@aelea/core'
import { $column, $Field } from '@aelea/ui-components'
import { pallete } from '@aelea/ui-components-theme'
import { constant, map, now, startWith, switchLatest } from '@most/core'
import { Contact } from '../api/types'


function objectValuesContainsText<T>(obj: T, text: string) {
  const match = Object.values(obj).find(value => {
    return typeof value === 'string' && value.indexOf(text) !== -1
  })

  return match !== undefined
}

export const $ContactList = (list: Contact[]) =>  component((
  [sampleSearch, search]: Behavior<string, string>,
  [sampleSelect, select]: Behavior<INode, Contact>,
) => {

  const selectedWithInitial = select

  const filter = map(str => list.filter(contact => objectValuesContainsText(contact, str)), search)
  const filteredList = startWith(list, filter)


  const $searchField = style({ width: '100%', flex: 'none', padding: '10px 20px' })(
    $Field({ value: now(''), placeholder: 'search' })({ change: sampleSearch() })
  )

  return [
    $column(style({ width: '180px' }))(
      $searchField,
      switchLatest(
        map(items => {
          return $column(
            ...items.map(contact => {

              const selectedStyle = styleBehavior(map(selection => {
                return selection.id === contact.id
                  ? { backgroundColor: pallete.primary, cursor: 'default' }
                  : null
              }, selectedWithInitial))
  
              const selectBehavior = sampleSelect(
                event('click'),
                constant(contact)
              )

              return $text(style({ padding: '6px 12px', cursor: 'pointer' }), selectBehavior, selectedStyle)(
                contact.name
              )
            })
          )
        }, filteredList)
      )
    ),
    {
      select,
    }
  ]
})