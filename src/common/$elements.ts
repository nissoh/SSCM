import { $element, attr, style } from "@aelea/core"
import { $row, layoutSheet } from "@aelea/ui-components"
import { pallete } from "@aelea/ui-components-theme"

export const $link = $element('a')(
  style({ color: pallete.description, cursor: 'pointer', textDecoration: 'none' })
)

export const $formAction = $row(
  layoutSheet.spacing,
  style({ flexDirection: 'row-reverse', alignItems: 'center', placeContent: 'center' })
)


// <iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="" allowfullscreen></iframe>
export const $nyanWorld = $element('iframe')(attr({
  src: 'https://www.youtube.com/embed/QH2-TGUlwu4?start=35',
  width: '100%',
  height: '100%',
  autoplay: 1,
  t: 0,
  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  frameborder: 0,
  controls: 0
}))()