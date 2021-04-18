
import type { Theme } from '@aelea/ui-components-theme'

// https://www.radixdlt.com/
// --background-color: #fff;
// --bg-shade-color: #dde5ed;
// --bg-shade-color-alt: #f2f2fc;
// --bg-shade-empty: #e6f1f4;
// --border-light: #e8edf2;
// --primary-color: #060f8f;
// --primary-color-alt: #052cc0;
// --primary-brand-color: #00c389;
// --primary-brand-color-alt: #00ab84;
// --font-color: #003057;
// --font-color-alt: #425563;
// --box-color: #dfdfdf;
// --shade-gradient: linear-gradient(270deg,var(--bg-shade-color-alt),#fff);
// --primary-gradient: linear-gradient(180deg,var(--primary-color-alt),var(--primary-color));
// --primary-gradient-rot: linear-gradient(225deg,var(--primary-color-alt),var(--primary-color));
// radial-gradient(at center center, #0a0f5f 50vh, #00002d)

const dark: Theme = {
  name: 'dark',
  pallete: {
    primary: '#00c389',

    message: '#ffffff',
    description: '#7689dc',

    foreground: '#7689dc',
    middleground: '#06094a',
    background: '#00002d',
    horizon: '#00002d',

    positive: '#7af7a6',
    negative: '#ff9393',
    indeterminate: 'yellow',
  }
}

const light: Theme = {
  name: 'light',
  pallete: {
    primary: '#5b7fff',

    message: '#000',
    description: '#414645',

    foreground: '#7689dc',
    middleground: '#c3dad4',
    background: '#fff',
    horizon: '#00002d',

    positive: '#7af7a6',
    negative: '#ca4646',
    indeterminate: 'yellow',
  }
}

export default { light, dark }

