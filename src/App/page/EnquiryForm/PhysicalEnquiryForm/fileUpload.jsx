import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Empty, Image, Upload, message } from "antd";
import React, { useState } from "react";
import "./index.scss";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const FileUpload = ({ files, setFiles }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const props = {
    name: "file",
    customRequest: ({ file, onSuccess, onError }) => {
      if (file.size > 2 * 1024 * 1024) {
        message.error("Enter file with size less than 2MB");
        onError(new Error("File size exceeds 2MB"));
        return;
      }

      getBase64(file)
        .then((base64) => {
          setFiles((prevFiles) => [
            ...prevFiles,
            {
              uid: file.uid,
              name: file.name,
              status: "done",
              url: base64,
            },
          ]);
          message.success(`${file.name} file uploaded successfully`);
          onSuccess();
        })
        .catch((error) => {
          message.error(`${file.name} file upload failed.`);
          onError(error);
        });
    },
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleRemove = (file) => {
    const newFiles = files.filter((item) => item.uid !== file.uid);
    setFiles(newFiles);
  };
  return (
    <>
      <div
        style={{ overflowY: "scroll", overflowX: "hidden" }}
        className={files?.length > 0 ? "mt-4 " : "custom-upload"}
      >
        <Upload
          {...props}
          data={{ key: "files" }}
          listType="picture-card"
          className="w-100 "
          onPreview={handlePreview}
          fileList={files}
          onChange={({ fileList }) => setFiles(fileList)}
        >
          {files?.length > 0 ? (
            <Button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          ) : (
            <div className="">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <Empty description={"Start Uploading files"} />
              </button>
              <div className="mt-2">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Files
                </Button>
              </div>
            </div>
          )}
        </Upload>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FileUpload;
