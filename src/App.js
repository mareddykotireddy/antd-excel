import { Table, Button } from 'antd';
import * as XLSX from 'xlsx';

const Antd = () => {
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 30,
      address: 'New York City',
      nestedData: [
        {
          loc: 'andhra',
          place: 'ongole',
          contact: '95425400'
        },
        {
          loc: 'tirupati',
          place: 'tirupati',
          contact: '1967543'
        },
        {
          loc: 'kadapa',
          place: 'kadapa',
          contact: '1967543'
        }
      ]
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 25,
      address: 'San Francisco',
      nestedData: [
        {
          loc: 'Telagana',
          place: 'madhapur',
          contact: '95425400'
        }
      ]
    },
    {
      key: '3',
      name: 'Bob Johnson',
      age: 35,
      address: 'Los Angeles',
      nestedData: [
        {
          loc: 'uttrapradesh',
          place: 'ongole',
          contact: '95425400'
        },
        {
          loc: 'bihar',
          place: 'ongole',
          contact: '95425400'
        },
      ]
    }
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
  // const onExpand = (record) => {
  //   const key = record.key;
  //   const expanded = expandedRows.includes(key);
  //   if (expanded) {
  //     setExpandedRows(expandedRows.filter((k) => k !== key));
  //   } else {
  //     setExpandedRows([...expandedRows, key]);
  //   }
  // };
  const exportToXlsx = () => {
    const workbook = XLSX.utils.book_new();
    // const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const nestedData = [];
  
    dataSource.forEach((record) => {
      const data = record.nestedData;
      data.forEach((nestedRecord) => {
        nestedData.push({
          Name: record.name,
          Age: record.age,
          Address: record.address,
          ...nestedRecord
        });
      });
    });
  
    const nestedWorksheet = XLSX.utils.json_to_sheet(nestedData);
    XLSX.utils.book_append_sheet(workbook, nestedWorksheet, 'Sheet1');
  
    XLSX.writeFile(workbook, 'table.xlsx');
  };
  
  
  const expandedRowRender = (record) => {
    const data = record.nestedData;
    return (
      <div className="nested-table">
        <Table dataSource={data} columns={childColumns} pagination={false} />
      </div>
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
        // onExpand={onExpand}
        // rowClassName={(record) =>
        //   expandedRows.includes(record.key) ? 'expanded-row' : ''
        // }
      />
    </div>
  );
};

export default Antd;