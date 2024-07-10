# Fuul Frontend Code Challenge

Create Fuul SDK and Webapp using TypeScript, React, and Vite.


## How to start the project

Install dependencies:

```console
npm install
```

At the main `package.json` we can find the followings scripts:

```json
{
  "scripts": {
    "test-linter:sdk": "cd sdk && npm run test && npm run lint",
    "linter:web": "cd web && npm run lint",
    "code-quality": "npm run test-linter:sdk && npm run linter:web",
    "prepare": "npm run prepare:sdk && npm run prepare:web",
    "prepare:sdk": "cd sdk && npm install && npm run build",
    "prepare:web": "cd web && npm install",
    "dev": "cd web && npm run dev"
  }
}
```

We need to install the dependencies in our packages, so run the following script:

```console
npm run prepare
```

This script installs the dependencies in each package and creates the SDK build using Rollup.

---

Next, we need to start our server:

```console
npm run dev
```

Now you can navigate to <http://localhost:5173/>

## Improvements

I found many improvements that I can make, but I consider that I have already spent a lot of time. Here are the proposals:

- Implement Tailwind
- Create shared tsconfig and eslint files for web and sdk packages
- Implement some test cases for the web UI and hooks using @testing-library
- Configure airbnb-typescript/base for the web package
- Improve styles
- Implement Babel in the SDK for better compatibility across browsers
- Investigate more about Rollup and its benefits
- Create a better component structure with custom components
- Install and configure stylelint with Husky. It runs commands on staged files only and adds formatted code to the commit.
- Implement a router and layout structure

## Considerations

- To create the SDK, I had to read some blogs and documentation, but most of my ideas came from [metamask-sdk](https://github.com/MetaMask/metamask-sdk/blob/main/packages/sdk-react/package.json) where I decided to implement rollup.
- I focused on the developer experience (DX): Configuring and implementing Linter, Testing, and TypeScript.
- In the beginning, I decided to use `wagmi`, but I found many dependencies that I didn't need, as well as some vulnerabilities related to MetaMask and React Native (packages we aren't using). For this reason, I decided to use `ethers`.
- I didn't put much effort into the styles, I'm sorry  :-(
- I didn't good understand this: "Assume that projects are able to define this data on the Fuul app modal editor.".
- For seamless local development, the SDK package can be installed in the web app using a local file path: "fuul-sdk": "file:../sdk".

