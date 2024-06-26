# react-add-new

### ✨ CLI tool to create new React components

A utility for quickly adding new React components. Currently non-configurable, it utilizes predefined templates and requires the following prerequisites:

-   **TypeScript**: All components are generated in `.ts` or `.tsx` files.
-   **Material UI** (optional for styling): Styles are generated utilizing Material UI and styled components. However, you can exclude styling from component generation process and use your own styles.

To facilitate context generation, a Provider component is created (e.g., MySuperContextProvider) alongside the context. This component is then exported along with a custom hook designed for accessing the context value (e.g., useMySuperContext). You can check out similar usages of context on these great articles:

https://tkdodo.eu/blog/react-query-and-react-context

https://tkdodo.eu/blog/zustand-and-react-context

## Usage

You can install the package globally using the following command:

```
npm i -g react-add-new
```

After successful installation, you can utilize the package using the following command:

```
react-add-new
```

Alternatively, you can utilize it using the command:

```
npx react-add-new
```

This command will print all the available CLI options. A new component can be created using either interactive mode or command arguments.

#### Interactive mode

You can enter interactive mode using one of the following commands:

##### Component

```
react-add-new component -i
```

##### Context

```
react-add-new context -i
```

Terminal prompts will guide you through the generation process. Generation path is selected using fuzzy search and you can set the desired depth & path for limiting the depth and root path of sub-folders to scan:

```
react-add-new component -i --depthLimit 10 --rootPath src
```

Please note that when `-i` command line argument is provided, non-interactive mode arguments are ignored 🙃.

#### Non-interactive mode

##### Component

You can create a component directly in non-interactive mode using the following command:

```
react-add-new component -n TestComponent -p components
```

You can also provide the oprional arguments `--noStyles` and `--noTypes`, in order to exclude styles & types from generation.

##### Context

You can create a context provider directly in non-interactive mode using the following command:

```
react-add-new context -n MySuperContext -p context
```

## Development

1. Download the project code
2. Run the command `npm install` to install required dependencies
3. After making desired changes, use the commands `npm build` & `npm pack` to create a local package file (e.g. `react-add-new-1.0.0.tgz`)
4. Create a test React project
5. Copy the `.tgz` file into the React test project directory and run `npm i ./react-add-new-1.0.0.tgz --save-dev`
6. Say hi (`npx react-add-new hi`) and expect a friendly greeting 😺
