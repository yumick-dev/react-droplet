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
import "react-droplet/dist/styles.css"; // optional if your bundler supports CSS imports

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

| Prop                    | Type                                                                                                                                                     | Default     | Description                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| **accept**              | `string`                                                                                                                                                 | `undefined` | Comma-separated file extensions that are allowed (e.g., "image/png, .jpg"). |
| **multiple**            | `boolean`                                                                                                                                                | `false`     | Allows selecting or dropping multiple files.                                |
| **icon**                | `(ref: React.RefObject<any>) => ReactElement`                                                                                                            | `undefined` | Custom icon renderer. Receives iconRef.                                     |
| **label**               | `(ref: React.RefObject<any>) => ReactElement`                                                                                                            | `undefined` | Custom label renderer. Receives labelRef.                                   |
| **onUploadFiles**       | `(files: File[]) => void`                                                                                                                                | `undefined` | Called when valid files are uploaded.                                       |
| **onInvalidFiles**      | `({ error: string; invalidFiles: File[]; validFiles: File[] }) => void`                                                                                  | `undefined` | Called when some files do not match the accepted extensions.                |
| **classnames**          | `{ droplet?: Classname; icon?: Classname; label?: Classname }`<br><br>**Classname:**<br>`{ default?: string; onDisabled?: string; onDragOver?: string }` | `undefined` | Custom class names for each component part.                                 |
| **disabled**            | `boolean`                                                                                                                                                | `false`     | Disables clicking, dragging, and file uploads.                              |
| **handleOnClick**       | `({ event: MouseEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                          | `undefined` | Custom click handler. Prevents the default “open file browser”.             |
| **handleOnInputChange** | `({ event: ChangeEvent<HTMLInputElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                       | `undefined` | Custom handler when a file is selected via the <input>.                     |
| **handleOnDrop**        | `({ event: DragEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                           | `undefined` | Custom drop handler that overrides default upload logic.                    |
| **handleOnDragOver**    | `({ event: DragEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef }) => void`                                                                | `undefined` | Custom drag-over handler overriding default hover styles.                   |
| **handleOnDragLeave**   | `({ event: DragEvent<HTMLDivElement>, dropletRef, inputRef, iconRef, labelRef, removeDragOverStyle }) => void`                                           | `undefined` | Custom drag-leave handler.                                                  |
| **children**            | `({ iconRef: RefObject<any>, labelRef: RefObject<any> }) => ReactElement`                                                                                | `undefined` | Fully replaces internal UI. Receives iconRef and labelRef.                  |
