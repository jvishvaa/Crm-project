import React from "react";
import "./index.scss";
import { Button, Typography } from "antd";

const UploadFile = ({
  selectedFile,
  fileUploadChangeHandler,
  disabled,
  accept,
  type,
  label,
  required,
  labelClassName,
  inputClassName,
}) => {
  return (
    <>
      <input
        style={{ display: "none" }}
        id="outlined-button-file"
        type="file"
        multiple={type === "multiple" ? true : false}
        disabled={[null, undefined].includes(disabled) ? false : disabled}
        key={selectedFile}
        accept={accept}
        onChange={(e) => {
          fileUploadChangeHandler(e);
        }}
      />
      {label ? (
        <Typography className={`${labelClassName || ""} th-10 th-fw-400`}>
          {label}
        </Typography>
      ) : null}
      <label
        htmlFor="outlined-button-file"
        style={{ width: "100%" }}
        className={`${inputClassName || ""} ${label ? `mt-0` : ``}`}
      >
        <div
          className={disabled ? "file-upload-div-disabled" : "file-upload-div"}
          htmlFor="outlined-button-file"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "clip",
          }}
        >
          <div className="file-upload-button" size="small">
            Choose file&nbsp;
            {required ? <span style={{ color: "red" }}>*</span> : null}
          </div>
          <Typography className="file-name-text">
            {type === "multiple"
              ? "Choose File"
              : selectedFile
              ? selectedFile.name
              : "No file chosen"}
          </Typography>
        </div>
      </label>
    </>
  );
};

export default UploadFile;
