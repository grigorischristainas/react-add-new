# react-add-new

### ✨ CLI tool to create new react components

A utility for quickly adding new React components. Not configurable for the moment, generates styles assuming you are using
MUI and styled components.

## Usage

Currently the project is not published in npm. In order to use it, you can download it and then run:

```
npm run build
```

which will output a dist directory. You can then run the following command:

```
npm pack
```

which will create a .tgz file (e.g. react-add-new-0.1.0.tgz), which you can then copy in the desired project directory and run:

```
npm i ./react-add-new-0.1.0.tgz
```

After successful installation, you can utilize the package using the following command:

```
npx react-add-new
```

This command will print all the available CLI options. In order to create a new component you can use the following command:

```
npx react-add-new component -n TestComponent -p components --withStyles --withTypes
```

This will generate a directory `components`, relatively to the current directory from which the command is called, and will then add the corresponding component files. Arguments `--withStyles` and `--withTypes` are optional, if utilized then the component template will be modified accordingly to import styles & types.

## Development

1. Download the project code.
2. Run the command `npm install` to install required dependencies.
3. After making desired changes, use the commands `npm build` & `npm pack` to create a local package file (e.g. `react-add-new-0.1.0.tgz`)
4. Create a test React project.
5. Copy the `.tgz` file into the React test project directory and run `npm i ./react-add-new-0.1.0.tgz`.
