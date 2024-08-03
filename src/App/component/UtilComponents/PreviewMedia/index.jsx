import { Button, Carousel, Modal, Row } from "antd";
import React, { useState } from "react";
import "./index.scss";
import { MdClose } from "react-icons/md";
import getExtensions from "../../../utils/getExtensions";
import useWindowDimensions from "../useWindowDimensions";

const PreviewMedia = ({ modalData, closeModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  return (
    <Modal
      centered
      open={modalData?.show}
      maskClosable={false}
      width={1000}
      className="preview-media-modal"
      onCancel={() => {
        setCurrentIndex(0);
        closeModal();
      }}
      closeIcon={
        <Button size="small" type="primary" icon={<MdClose size={20} />} />
      }
      footer={null}
    >
      <Carousel
        arrows
        infinite={false}
        afterChange={(current) => {
          setCurrentIndex(current);
        }}
      >
        {modalData?.urls?.map((each, index) => {
          let isVideo = getExtensions("video").includes(
            `.${each?.split(".")?.pop()}`
          );
          if (isVideo) {
            return (
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  {currentIndex === index ? (
                    <video
                      style={{
                        maxHeight: "80vh",
                        padding: "30px 0px",
                        width: width < 768 ? "85%" : "90%",
                      }}
                      autoPlay
                      controls
                      src={each}
                    />
                  ) : null}
                </div>
              </div>
            );
          } else {
            return (
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={each}
                    style={{
                      objectFit: "contain",
                      maxHeight: "80vh",
                      padding: "30px 0px",
                    }}
                    width={width < 768 ? "85%" : "90%"}
                  />
                </div>
              </div>
            );
          }
        })}
      </Carousel>
    </Modal>
  );
};

export default PreviewMedia;
