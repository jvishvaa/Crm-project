import React, { useEffect, useState } from "react";
import { Table } from "antd";
import getArrayValues from "../../utils/getArrayValues";

const RenderTable = ({
  category_name,
  categories,
  series,
  valueLabel,
  height,
}) => {
  const [tableData, setTableData] = useState([]);
  const [subColumnList, setSubColumnList] = useState([]);

  useEffect(() => {
    if (category_name && categories && series && valueLabel) {
      let myTableData = [];
      categories?.map((each, index) => {
        let seriesData = {};
        series?.map((eachItem) => {
          if (eachItem?.name) {
            seriesData[eachItem?.name] = eachItem?.data[index];
          } else {
            seriesData[valueLabel] = eachItem?.data[index];
          }
        });
        myTableData.push({
          [category_name]: each,
          ...seriesData,
        });
      });
      setTableData(myTableData);
      setSubColumnList(getArrayValues(series, "name"));
    }
  }, [category_name, categories, series, valueLabel]);

  const getChildren = () => {
    let childrenData = [];
    subColumnList?.map((each) => {
      childrenData.push({
        title: each,
        key: each,
        render: (record) => <span>{record[each]}</span>,
        align: "center",
      });
    });
    return childrenData;
  };

  const columns = [
    {
      title: category_name,
      key: category_name,
      render: (record) => <span>{record[category_name]}</span>,
      align: "center",
      fixed: "left",
    },
    ...(series?.length && series[0]?.name
      ? [
          {
            title: valueLabel,
            key: valueLabel,
            children: getChildren(),
            align: "center",
          },
        ]
      : [
          {
            title: valueLabel,
            key: valueLabel,
            render: (record) => <span>{record[valueLabel]}</span>,
            align: "center",
          },
        ]),
  ];

  return (
    <>
      {category_name && categories && series && valueLabel ? (
        <div style={{ height: height - 30 || "auto", overflow: "auto" }}>
          <Table
            dataSource={tableData || []}
            columns={columns}
            bordered={true}
            pagination={false}
            className="p-1"
          />
        </div>
      ) : null}
    </>
  );
};

export default RenderTable;
