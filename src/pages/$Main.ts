import { $text, Behavior, component, O, style } from '@aelea/core'
import { $Button, $column, $row, designSheet, layoutSheet, state } from '@aelea/ui-components'
import { pallete } from '@aelea/ui-components-theme'
import { constant, map, mergeArray, now, sample, snapshot, startWith, switchLatest } from '@most/core'
import store from '../api/store'
import { Contact, Credentials } from '../api/types'
import { $nyanWorld } from '../common/$elements'
import theme from '../common/theme'
import { $ContactDetails } from '../components/$ContactDetails'
import { $ContactEditor } from '../components/$ContactEditor'
import { $ContactList } from '../components/$ContactList'
import { $AppSettings } from '../components/$ThemePicker'
import { fadeIn } from '../transitions/enter'
import { $Startup } from './$Startup'



const mainStyle = O(
  designSheet.main,
  style({
    fontFamily: 'Nunito', fontWeight: 'normal', fontSize: '1rem',
    backgroundImage: `radial-gradient(at center center, ${pallete.middleground} 50vh, ${pallete.background})`,
    alignItems: 'center', placeContent: 'center', padding: '55px 0'
  })
)

const contentStyle = style({
  width: '550px', maxWidth: '90vw', height: '500px', backgroundColor: pallete.background, borderRadius: '30px', overflow: 'hidden',
  alignItems: 'center', placeContent: 'center',
  boxShadow: 'rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px'
})

export const $Main = component((
  [sampleLogin, login]: Behavior<Credentials, Credentials>,
  [sampleSelectContact, selectContact]: Behavior<Contact, Contact>,
  [sampleClickEdit, clickEdit]: Behavior<PointerEvent, string>,

  [sampleModifyContactList, modifyContactList]: Behavior<Contact, Contact[]>,

  // navigate
  [sampleShowContactEditor, showContactEditor]: Behavior<PointerEvent, PointerEvent>,
  [sampleCancel, cancel]: Behavior<PointerEvent, PointerEvent>
) => {


  const decryptInitialContactList = store.decryptContactList(login)

  const encryptContactListChanges = map(x => x.contactList, store.encryptContactList(
    snapshot((credentials, contactList) => ({ contactList, credentials }), login, modifyContactList)
  ))

  // multicast and replay state to all subscribers
  const updateContactList = state.replayLatest(mergeArray([decryptInitialContactList, encryptContactListChanges]))
  const initialSelectedContactList = startWith(null, selectContact)

  const $contractList = map(list => {
    return $row(layoutSheet.flex, fadeIn, style({ width: '100%' }))(
      $ContactList(list)({
        select: sampleSelectContact()
      }),
      $column(layoutSheet.flex, style({ borderLeft: `1px solid ${pallete.description}` }))(
        $column(layoutSheet.flex, style({ padding: '24px' }))(
          switchLatest(
            snapshot((contactList, selectedContact) => {
              if (selectedContact === null)
                return $column(layoutSheet.flex, style({ placeContent: 'center', color: pallete.description }))(
                  contactList.length === 0
                    ? $column(style({ alignItems: 'center' }))(
                      $text('Contact list is empty'),
                      $text('Click on "Add" button to add one')
                    )
                    : $text(style({ alignItems: 'center' }))('Select a contact'),
                  
                )

              return $ContactDetails(selectedContact)({})
            }, updateContactList, initialSelectedContactList)
          )
        ),
        $row(style({ borderTop: `1px solid ${pallete.description}`, padding: '12px 24px', placeContent: 'space-between' }))(
          $Button({ $content: $text('Add') })({
            click: sampleShowContactEditor()
          }),
          $Button({ $content: $text('Edit'), disabled: map(contact => contact === null, initialSelectedContactList) })({
            click: sampleClickEdit()
          })
        ),
      )
    )
  }, updateContactList)


  const $newContact = $ContactEditor({ name: '', email: '', address: '', phone: '' })({
    save: sampleModifyContactList(
      snapshot((seed, newContact) => {
        return [...seed, { ...newContact, id: Date.now() }]
      }, updateContactList)
    ),
    cancel: sampleModifyContactList(sample(updateContactList))
  })

  const editSelectedContact = sample(selectContact, clickEdit)
  const $editContact = map(contact => {
    return $ContactEditor(contact)({
      save: sampleModifyContactList(
        snapshot((seed, modifiedContact) => {
          const contact = seed.find(c => c.id === modifiedContact.id)
          if (contact)
            Object.assign(contact, modifiedContact)

          return seed
        }, updateContactList)
      ),
      cancel: sampleModifyContactList(sample(updateContactList))
    })
  }, editSelectedContact)


  const $login = $Startup({
    login: sampleLogin(store.storeAccount),
    cancel: sampleCancel()
  })

  return [
    $column(mainStyle)(
      $AppSettings([theme.dark, theme.light])({}),

      $column(contentStyle, fadeIn)(
        switchLatest(

          // switches between different content. occuring durction application behavior changes
          mergeArray([
            now($login),

            $contractList,
            constant($nyanWorld, cancel),
            constant($newContact, showContactEditor),

            $editContact
          ])

        )
      )
    )
  ]
})


