import { $Node, $svg, attr } from "@aelea/core"

interface Icon {
  width?: number // in pixels
  height?: number // in pixels
  $content: $Node
  viewBox?: string
  fill?: string
}
const $path = $svg('path')

export const $icon = ({ $content, width = 24, height = width, viewBox = `0 0 ${width} ${height}`, fill = 'inherit' }: Icon) => (
  $svg('svg')(
    attr({ viewBox, width, height, fill }),
  )($content)
)


export const $logo = $path(
  attr({
    d: 'M13.4 27.7c-.6 0-1.2-.3-1.5-.8L4.4 16.6H-.4v-3.8h5.8c.6 0 1.2.3 1.5.8L13 22 22.3.8c.3-.7 1-1.1 1.7-1.1h11.6v3.8H25.2L15.1 26.6c-.3.6-.8 1-1.5 1.1h-.2',
    'fill-rule': 'evenodd'
  })
)()
export const $trash = $icon({
  $content: $svg('path')(attr({ d: 'M9 9.5v9c0 .281-.219.5-.5.5h-1a.494.494 0 01-.5-.5v-9c0-.281.219-.5.5-.5h1c.281 0 .5.219.5.5zm4 0v9c0 .281-.219.5-.5.5h-1a.494.494 0 01-.5-.5v-9c0-.281.219-.5.5-.5h1c.281 0 .5.219.5.5zm4 0v9c0 .281-.219.5-.5.5h-1a.494.494 0 01-.5-.5v-9c0-.281.219-.5.5-.5h1c.281 0 .5.219.5.5zm2 11.313V6H5v14.813c0 .75.422 1.187.5 1.187h13c.078 0 .5-.438.5-1.188zM8.5 4h7l-.75-1.828A.603.603 0 0014.484 2H9.531a.526.526 0 00-.265.172L8.5 4zm14.5.5v1c0 .281-.219.5-.5.5H21v14.813C21 22.53 19.875 24 18.5 24h-13C4.125 24 3 22.594 3 20.875V6H1.5a.494.494 0 01-.5-.5v-1c0-.281.219-.5.5-.5h4.828l1.094-2.61C7.734.626 8.672 0 9.5 0h5c.828 0 1.766.625 2.078 1.39L17.672 4H22.5c.281 0 .5.219.5.5z' }))()
})



