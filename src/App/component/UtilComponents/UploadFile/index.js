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
        <Typography className="mt-3 th-10 th-fw-400">{label}</Typography>
      ) : null}
      <label
        htmlFor="outlined-button-file"
        style={{ width: "100%" }}
        className={label ? "mt-0" : "mt-3"}
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
          <Button type="primary" className="file-upload-button" size="small">
            Choose file&nbsp;
            <span style={{ color: "red" }}>*</span>
          </Button>
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
