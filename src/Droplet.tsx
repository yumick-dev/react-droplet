import React, { useEffect, useRef } from "react";

type Classname = {
  default?: string;
  onDisabled?: string;
  onDragOver?: string;
};

type Props = {
  accept?: string;
  multiple?: boolean;
  icon?: (ref: React.RefObject<any>) => React.ReactElement;
  label?: (ref: React.RefObject<any>) => React.ReactElement;
  onUploadFiles?: (files: File[]) => void;
  onInvalidFiles?: (data: {
    error: string;
    invalidFiles: File[];
    validFiles: File[];
  }) => void;
  classnames?: {
    droplet?: Classname;
    icon?: Classname;
    label?: Classname;
  };
  disabled?: boolean;
  handleOnClick?: (data: {
    event: React.MouseEvent<HTMLDivElement>;
    dropletRef: React.RefObject<any>;
    inputRef: React.RefObject<any>;
    iconRef: React.RefObject<any>;
    labelRef: React.RefObject<any>;
    removeDragOverStyle: () => void;
  }) => void;
  handleOnInputChange?: (data: {
    event: React.ChangeEvent<HTMLInputElement>;
    dropletRef: React.RefObject<any>;
    inputRef: React.RefObject<any>;
    iconRef: React.RefObject<any>;
    labelRef: React.RefObject<any>;
    removeDragOverStyle: () => void;
  }) => void;
  handleOnDrop?: (data: {
    event: React.DragEvent<HTMLDivElement>;
    dropletRef: React.RefObject<any>;
    inputRef: React.RefObject<any>;
    iconRef: React.RefObject<any>;
    labelRef: React.RefObject<any>;
    removeDragOverStyle: () => void;
  }) => void;
  handleOnDragOver?: (data: {
    event: React.DragEvent<HTMLDivElement>;
    dropletRef: React.RefObject<any>;
    inputRef: React.RefObject<any>;
    iconRef: React.RefObject<any>;
    labelRef: React.RefObject<any>;
  }) => void;
  handleOnDragLeave?: (data: {
    event: React.DragEvent<HTMLDivElement>;
    dropletRef: React.RefObject<any>;
    inputRef: React.RefObject<any>;
    iconRef: React.RefObject<any>;
    labelRef: React.RefObject<any>;
    removeDragOverStyle: () => void;
  }) => void;
  children?: (data: {
    iconRef: React.RefObject<any>;
    labelRef: React.RefObject<any>;
  }) => React.ReactElement;
};

const Droplet: React.FC<Props> = (props) => {
  const {
    accept,
    multiple = false,
    icon,
    label,
    onUploadFiles,
    onInvalidFiles,
    disabled,
    classnames,
    handleOnClick,
    handleOnInputChange,
    handleOnDrop,
    handleOnDragOver,
    handleOnDragLeave,
    children,
  } = props;

  const dropletRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  // Which file will be accepted or rejected
  const acceptedFiles = (accept || "")
    .split(",")
    .map((a) => a.trim().toLowerCase().trim());

  // Set style when the droplet is disabled
  useEffect(() => {
    const drop = dropletRef.current;
    const icon = iconRef.current;
    const label = labelRef.current;

    if (!drop || !icon || !label) {
      return;
    }

    const cursorValue = disabled ? "not-allowed" : "pointer";
    drop.style.cursor = cursorValue;
    icon.style.cursor = cursorValue;
    label.style.cursor = cursorValue;

    // Let's add onDisabled classnames too
    const action = disabled ? "add" : "remove";
    if (classnames?.droplet?.onDisabled?.trim()) {
      drop.classList[action](...classnames.droplet.onDisabled.split(" "));
    }

    if (classnames?.icon?.onDisabled?.trim()) {
      icon.classList[action](...classnames.icon.onDisabled.split(" "));
    }

    if (classnames?.label?.onDisabled?.trim()) {
      label.classList[action](...classnames.label.onDisabled.split(" "));
    }
  }, [disabled]);

  // To verify if the uploaded files are verified or not
  const verifyInputFiles = (files: File[]) => {
    if (!accept?.trim()) {
      return { isVerified: true, invalidFiles: [], validFiles: files };
    }

    const invalidFiles: File[] = [];
    const validFiles = files.filter((file) => {
      const extensions = file.name.split(".");

      // Which file will be accepted or rejected
      if (acceptedFiles.includes("." + extensions[extensions.length - 1])) {
        return true;
      }
      invalidFiles.push(file);
      return false;
    });

    return { isVerified: !!!invalidFiles.length, invalidFiles, validFiles };
  };

  // Function to set files
  const setFiles = (files: File[]) => {
    if (!onUploadFiles || disabled) {
      return;
    }

    const { isVerified, invalidFiles, validFiles } = verifyInputFiles(files);

    if (!isVerified) {
      if (onInvalidFiles) {
        onInvalidFiles({
          error: "Invalid file upload.",
          invalidFiles,
          validFiles,
        });
      }

      return;
    }

    onUploadFiles(files);
  };

  // Function to remove all the styles applied for the drag over moment.
  const removeDragStyles = () => {
    const map = [
      [dropletRef?.current, `${classnames?.droplet?.onDragOver}`],
      [iconRef?.current, `${classnames?.icon?.onDragOver}`],
      [labelRef?.current, `${classnames?.label?.onDragOver}`],
    ] as const;

    map.forEach(([el, cls]) => {
      if (el && cls.trim()) el.classList.remove(...cls.split(" "));
    });
  };

  // When a user clicks instead of dropping files
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!inputRef?.current) {
      return;
    }

    if (handleOnClick) {
      handleOnClick({
        event,
        dropletRef,
        inputRef,
        iconRef,
        labelRef,
        removeDragOverStyle: removeDragStyles,
      });
    } else {
      inputRef.current.click();
    }
  };

  // On change event for input element
  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    if (handleOnInputChange) {
      handleOnInputChange({
        event,
        dropletRef,
        inputRef,
        iconRef,
        labelRef,
        removeDragOverStyle: removeDragStyles,
      });

      return;
    }

    // Converts FileList to Array
    const fileArray = Array.from(files);
    setFiles(fileArray);

    // Reset the input so the same file can trigger onChange again
    event.target.value = "";
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    if (handleOnDragOver) {
      handleOnDragOver({
        event: e,
        dropletRef,
        inputRef,
        iconRef,
        labelRef,
      });
      return;
    }

    // Adding styles while dragging over the droplet
    const map = [
      [dropletRef?.current, classnames?.droplet?.onDragOver],
      [iconRef?.current, classnames?.icon?.onDragOver],
      [labelRef?.current, classnames?.label?.onDragOver],
    ] as const;

    map.forEach(([el, cls]) => {
      if (el && cls) el.classList.add(...cls.split(" "));
    });
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    if (handleOnDrop) {
      handleOnDrop({
        event,
        dropletRef,
        inputRef,
        iconRef,
        labelRef,
        removeDragOverStyle: removeDragStyles,
      });
      return;
    }

    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);
    setFiles(fileArray);
    removeDragStyles();
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (handleOnDragLeave) {
      handleOnDragLeave({
        event,
        dropletRef,
        inputRef,
        iconRef,
        labelRef,
        removeDragOverStyle: removeDragStyles,
      });
    } else {
      removeDragStyles();
    }
  };

  // Function to set classnames for droplet
  const getDropletCSS = () => {
    if (disabled) {
      return `${classnames?.droplet?.default || "droplet"} ${
        classnames?.droplet?.onDisabled
      }`;
    }

    if (classnames?.droplet?.default) {
      return classnames.droplet.default;
    }

    return "droplet";
  };

  const getIconCSS = () => {
    if (disabled) {
      return `${classnames?.icon?.default || "cloud-icon"} ${
        classnames?.icon?.onDisabled
      }`;
    }

    if (classnames?.icon?.default) {
      return classnames.icon.default;
    }

    return "cloud-icon";
  };

  const getLabelCSS = () => {
    if (disabled) {
      return `${classnames?.label?.default || "droplet-label"} ${
        classnames?.label?.onDisabled
      }`;
    }

    if (classnames?.label?.default) {
      return classnames.label.default;
    }

    return "droplet-label";
  };

  // If the user sends children element, remove the default children
  const getChildren = () => {
    if (children) {
      return children({ iconRef, labelRef });
    }

    return (
      <>
        {typeof icon === "function" ? (
          icon(iconRef)
        ) : (
          <center ref={iconRef} className={getIconCSS()}>
            ☁️
          </center>
        )}

        {typeof label === "function" ? (
          label(labelRef)
        ) : (
          <label ref={labelRef} htmlFor="file" className={getLabelCSS()}>
            Drop files here or click to upload
          </label>
        )}
      </>
    );
  };

  // Main component's return
  return (
    <div
      ref={dropletRef}
      onClick={handleClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      className={getDropletCSS()}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChangeInput}
        hidden
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
      {getChildren()}
    </div>
  );
};

export default Droplet;
