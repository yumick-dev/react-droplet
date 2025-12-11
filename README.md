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

| Prop                    | Type                                                            | Default     | Description                                                                   |
| ----------------------- | --------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| **accept**              | `string`                                                        | `undefined` | Comma-separated file extensions that are allowed (e.g., `"image/png, .jpg"`). |
| **multiple**            | `boolean`                                                       | `false`     | Allows selecting or dropping multiple files.                                  |
| **icon**                | `(ref) => ReactElement`                                         | `undefined` | Custom icon renderer. Receives `iconRef`.                                     |
| **label**               | `(ref) => ReactElement`                                         | `undefined` | Custom label renderer. Receives `labelRef`.                                   |
| **onUploadFiles**       | `(files: File[]) => void`                                       | `undefined` | Called when valid files are uploaded.                                         |
| **onInvalidFiles**      | `(data) => void`                                                | `undefined` | Called when some files do not match the accepted extensions.                  |
| **classnames**          | `{ droplet?: Classname; icon?: Classname; label?: Classname; }` | `undefined` | Custom class names for different component parts.                             |
| **disabled**            | `boolean`                                                       | `false`     | Disables clicking, dragging, and file uploads.                                |
| **handleOnClick**       | `(data) => void`                                                | `undefined` | Custom handler for click events. Prevents the default “open file browser”.    |
| **handleOnInputChange** | `(data) => void`                                                | `undefined` | Custom handler when a file is selected via the `<input>`.                     |
| **handleOnDrop**        | `(data) => void`                                                | `undefined` | Custom drop handler that overrides the default file upload logic.             |
| **handleOnDragOver**    | `(data) => void`                                                | `undefined` | Custom drag over handler that overrides default hover styles.                 |
| **handleOnDragLeave**   | `(data) => void`                                                | `undefined` | Custom drag leave handler.                                                    |
| **children**            | `(data) => ReactElement`                                        | `undefined` | Render-prop to fully replace internal UI. Receives `iconRef` & `labelRef`.    |

### Classname Type

| Key                    | Sub-Key      | Type     | Description                                    |
| ---------------------- | ------------ | -------- | ---------------------------------------------- |
| **classnames.droplet** | `default`    | `string` | Base classes applied to the droplet container. |
| **classnames.droplet** | `onDisabled` | `string` | Classes applied when the droplet is disabled.  |
| **classnames.droplet** | `onDragOver` | `string` | Classes applied during drag-over state.        |
| **classnames.icon**    | `default`    | `string` | Base classes applied to the icon.              |
| **classnames.icon**    | `onDisabled` | `string` | Classes applied when icon is disabled.         |
| **classnames.icon**    | `onDragOver` | `string` | Classes applied when dragging over the icon.   |
| **classnames.label**   | `default`    | `string` | Base classes applied to the label text.        |
| **classnames.label**   | `onDisabled` | `string` | Classes applied when the label is disabled.    |
| **classnames.label**   | `onDragOver` | `string` | Classes applied when dragging over the label.  |
