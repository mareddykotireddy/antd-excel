import React, { useState } from 'react';
import { Table, Button } from 'antd';
import * as XLSX from 'xlsx';

const Antd = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 30,
      address: 'New York City',
      loc:"andhra",
      place:"ongole",
      contact:"95425400",
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 25,
      address: 'San Francisco',
      loc:"Telagana",
      place:"madhapur",
      contact:"95425400"
    },
    {
      key: '3',
      name: 'Bob Johnson',
      age: 35,
      address: 'Los Angeles',
      loc:"uttrapradesh",
      place:"ongole",
      contact:"95425400"
    },
    
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const childColumns = [
    {
      title: 'Location',
      dataIndex: 'loc',
      key: 'loc',
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
  ];
  const onExpand = (record) => {
    const key = record.key;
    const expanded = expandedRows.includes(key)
;
    if (expanded) {
      setExpandedRows(expandedRows.filter((k) => k !== key));
    } else {
      setExpandedRows([...expandedRows, key]);
    }
  };
  const exportToXlsx = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    dataSource.forEach((record) => {
      const data = [
        {
          Location: record.loc,
          Place: record.place,
          Contact: record.contact,
        },
        {
          Location: "tirupati",
          Place: "tirupati",
          Contact: 1967543,
        },
      ];
      const nestedWorksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, nestedWorksheet, record.name);
    });
  
    XLSX.writeFile(workbook, 'table.xlsx');
  };
  
  const expandedRowRender = (record) => {
    const data = [
      {
        key: '1',
        loc: record.loc,
        place: record.place,
        contact: record.contact,
      },
      {
        key: '2',
        loc: "tirupati",
        place: "tirupati",
        contact: 1967543,
      },
    ];
    return (
      <Table dataSource={data} columns={childColumns} pagination={false} />
    );
  };
  return (
    <div>
      <Button type="primary" onClick={exportToXlsx}>
        Export to XLSX
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        expandedRowRender={expandedRowRender}
        onExpand={onExpand}
        rowClassName={(record) =>
          expandedRows.includes(record.key) ? 'expanded-row' : ''
        }
      />
    </div>
  );
};

export default Antd;