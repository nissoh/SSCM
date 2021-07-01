## Simple Secured Contact Management
#### https://sordid-friend.surge.sh/

Simple Contact Management App built using https://aelea.dev

Featuring
- overall simple and modern look, contrast checks looks valid
- components are stateless and easily composable
- for core components i'm currently using `@aelea/ui-components` which is still WIP. some bugs and bad UX needs to be improved
- theme color adhere selected theme, currently supports dark & light
- App is compatible in 3 different environments! WEB, PWA and Electron(desktop)
  - a regular web application https://sordid-friend.surge.sh/
  - PWA Mobile/Desktop, installable by navigating to the webpage, a "install" or add to home screen icon should appear in both platforms
  - electron. this is questionable one. do electron provide extra features to the OS that PWA is missing?
- state storage encryption done using WebCrypto API. i have very little cryptography experience, so this was a learning experience for me (:
  - Login is using BLS12-381 type encryption(for the fun) i'm currently using a simple 1 signature scheme. i wanted to showcase a passwordless UX using a threshold token signature. but its a little overkill for a contact management. i think it would be awesome for a crypto wallet
  https://sepior.com/products/thresholdsig-wallet-security
  - Contacts are using The AES-GCM encryption and decryption, keys are derived from a password based key (PBKDF2). The encrypted output is written to and read from the Javascript runtime execution
- yarn v2 is being used. although it doesn't showcase its usefullness, but very powerful when a project grows, see key features https://yarnpkg.com/features/pnp



## Intial Setup

- install NodeJS, https://nodejs.org/en/
- `npm install -g yarn` cmd to install yarn package and project manager
- `yarn install` install and cache external dependancies
- `yarn dlx @yarnpkg/pnpify --sdk` initiate special configuration for TypeScript in smart IDE's(VSCode, IntelliJ) https://yarnpkg.com/getting-started/editor-sdks
> `yarn` has to be used to run scripts(npm will fail) and project managemnt commands
- `yarn dev` runs a development server

--
- `run-electron` build and pack and run electron through `.dist` directory
