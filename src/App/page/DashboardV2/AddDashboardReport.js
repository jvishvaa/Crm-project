import { Button, Checkbox, Col, Drawer, Input, Row, Typography } from "antd";
import "./index.scss";
import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineAddHomeWork } from "react-icons/md";
import { TbPhotoPentagon } from "react-icons/tb";

import { GiPersonInBed } from "react-icons/gi";
import { GrDocumentCloud, GrGroup } from "react-icons/gr";
import { HiOutlineDocumentReport } from "react-icons/hi";

const { TextArea } = Input;

const CustomHeader = ({ label, onClose }) => (
  <Row
    className="d-flex flex-row justify-content-between align-items-center"
    gutter={[4, 4]}
  >
    <Col xs={20}>
      <Typography>{label}</Typography>
    </Col>
    <Col xs={4}>
      <Row className="d-flex justify-content-end">
        <Button
          type="link"
          size="small"
          onClick={onClose}
          icon={<MdClose size={20} />}
        />
      </Row>
    </Col>
  </Row>
);

const AddDashboardReport = ({ modalData, handleAddDashboard, closeModal }) => {
  const [selectedReport, setSelectedReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const reportList = [
    {
      label: "Lead Management Report",
      value: "Lead Management Report",
      icon: <GrGroup />,
    },
    {
      label: "Digital Marketing Report",
      value: "Digital Marketing Report",
      icon: <GrDocumentCloud />,
    },
    {
      label: "Dormancy Report",
      value: "Dormancy Report",
      icon: <GiPersonInBed />,
    },
    {
      label: "Front Office Report",
      value: "Front Office Report",
      icon: <HiOutlineDocumentReport />,
    },
    {
      label: "Home Counselling Report",
      value: "Home Counselling Report",
      icon: <MdOutlineAddHomeWork />,
    },
    {
      label: "Walkin Report",
      value: "Walkin Report",
      icon: <TbPhotoPentagon />,
    },
  ];

  const onChangeCheckbox = (each) => {
    let mySelectedReport = [...selectedReport];
    if (mySelectedReport.includes(each.value)) {
      mySelectedReport = mySelectedReport.filter(
        (eachItem) => each.value !== eachItem
      );
    } else {
      mySelectedReport.push(each.value);
    }
    setSelectedReport([...mySelectedReport]);
  };

  return (
    <Drawer
      className="add-dashboard-drawer"
      title={
        <CustomHeader
          label={"Select Report"}
          onClose={() => {
            closeModal();
          }}
        />
      }
      onClose={() => {
        closeModal();
      }}
      open={modalData?.show && modalData?.type === "Add Report"}
      width={"92%"}
      closable={false}
      maskClosable={false}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            key="back"
            style={{ marginRight: 8 }}
            onClick={() => {
              closeModal();
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            disabled={selectedReport?.length === 0}
            onClick={() => {
              handleAddDashboard(selectedReport);
              setSelectedReport([]);

              closeModal();
            }}
            size="small"
          >
            Add Report
          </Button>
        </div>
      }
    >
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row gutter={[12, 12]}>
            {reportList?.map((each, index) => (
              <Col xs={24} sm={12} md={8} lg={6}>
                <Row
                  className={`card-report-name-tile ${
                    selectedReport?.includes(each.value)
                      ? "card-report-name-tile-selected"
                      : ""
                  }  d-flex flex-column justify-content-center align-content-center`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onChangeCheckbox(each);
                  }}
                >
                  <Checkbox
                    className={`card-report-name-tile-checkbox`}
                    checked={selectedReport?.includes(each.value)}
                    onChange={() => {
                      onChangeCheckbox(each);
                    }}
                  />
                  <Col className="d-flex  justify-content-center align-items-center">
                    {each.icon}
                  </Col>
                  <Col>
                    <Typography className="card-report-name-tile-text mt-1">
                      {each?.label}
                    </Typography>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddDashboardReport;
