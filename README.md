# React Droplet

A **lightweight, customizable React drag-and-drop file uploader** built with TypeScript.  
Drop files directly, click to upload, and easily handle validation for accepted file types.

---

## Features

- Drag & drop files or click to upload
- Supports single or multiple files
- File type validation with `accept` prop
- Disabled mode with customizable styles
- Fully customizable icon, label, and droplet styles
- TypeScript support
- Easily extendable with event handlers

---

## Installation

```bash
npm install react-droplet
# or
yarn add react-droplet
```

## How to use it?

```tsx
import React from "react";
import Droplet from "react-droplet";

function App() {
  const handleUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };

  const handleInvalidFiles = ({ error, invalidFiles }: any) => {
    console.error(error, invalidFiles);
  };

  return (
    <div>
      <h1>React Droplet Demo</h1>
      <Droplet
        accept=".jpg,.png,.pdf"
        multiple
        onUploadFiles={handleUpload}
        onInvalidFiles={handleInvalidFiles}
      />
    </div>
  );
}

export default App;
```

## Props

## Props

| Prop                    | Type                                                                                                                                                     | Default     | Description                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| **accept**              | `string`                                                                                                                                                 | `undefined` | Comma-separated file extensions that are allowed (e.g., ".png, .jpg"). |
| **multiple**            | `boolean`                                                                                                                                                | `false`     | Allows selecting or dropping multiple files.                           |
| **icon**                | `(ref: React.RefObject<any>) => ReactElement`                                                                                                            | `undefined` | Custom icon renderer. Receives iconRef.                                |
| **label**               | `(ref: React.RefObject<any>) => ReactElement`                                                                                                            | `undefined` | Custom label renderer. Receives labelRef.                              |
| **onUploadFiles**       | `(files: File[]) => void`                                                                                                                                | `undefined` | Called when valid files are uploaded.                                  |
| **onInvalidFiles**      | `({ error: string; invalidFiles: File[]; validFiles: File[] }) => void`                                                                                  | `undefined` | Called when some files do not match the accepted extensions.           |
| **classnames**          | `{ droplet?: Classname; icon?: Classname; label?: Classname }`<br><br>**Classname:**<br>`{ default?: string; onDisabled?: string; onDragOver?: string }` | `undefined` | Custom class names for each component part.                            |
| **disabled**            | `boolean`                                                                                                                                                | `false`     | Disables clicking, dragging, and file uploads.                         |
| **handleOnClick**       | `({ event: MouseEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                          | `undefined` | Custom click handler. Prevents the default “open file browser”.        |
| **handleOnInputChange** | `({ event: ChangeEvent<HTMLInputElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                       | `undefined` | Custom handler when a file is selected via the (input) click.          |
| **handleOnDrop**        | `({ event: DragEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                           | `undefined` | Custom drop handler that overrides default upload logic.               |
| **handleOnDragOver**    | `({ event: DragEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef }) => void`                                                                | `undefined` | Custom drag-over handler overriding default hover styles.              |
| **handleOnDragLeave**   | `({ event: DragEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                           | `undefined` | Custom drag-leave handler.                                             |
| **children**            | `({ iconRef: RefObject<any>, labelRef: RefObject<any> }) => ReactElement`                                                                                | `undefined` | Fully replaces internal UI. Receives iconRef and labelRef.             |

## How to override UI completely using children prop

```tsx
<Droplet>
  {({ iconRef, labelRef }) => (
    <div className="my-custom-ui">
      <span ref={iconRef}>🌤️</span>
      <p ref={labelRef}>Upload your files</p>
    </div>
  )}
</Droplet>
```

Note: To customize entire droplet, you need to use children property with iconRef and labelRef. When you set references of icon and label, it will automatically apply the default behavior of the droplet.

## Override default styles

You can fully customize the look of your droplet by using the classnames prop to override the built-in CSS classes. Each part of the component — the root droplet, icon, and label — supports three style states: default for normal appearance, onDisabled when disabled, and onDragOver when a file is dragged over the zone. By providing your own class names for these keys, you replace the default styling with your own, allowing seamless integration with Tailwind, Bootstrap, or any CSS setup you prefer.

```tsx
import Droplet from "react-droplet";

function App() {
  return (
    <Droplet
      classnames={{
        droplet: {
          default: "custom-droplet",
          onDisabled: "custom-droplet-disabled",
          onDragOver: "custom-droplet-hover",
        },
        icon: {
          default: "custom-icon",
          onDisabled: "custom-icon-disabled",
          onDragOver: "custom-icon-hover",
        },
        label: {
          default: "custom-label",
          onDisabled: "custom-label-disabled",
          onDragOver: "custom-label-hover",
        },
      }}
    />
  );
}

export default App;
```
