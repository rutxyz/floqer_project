import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SalaryData } from '../types';
import { fetchSalaries } from '../api';

interface AggregatedData {
  year: number;
  totalJobs: number;
  averageSalary: number;
}

const MainTable: React.FC<{ onRowClick: (year: number) => void }> = ({ onRowClick }) => {
  const [data, setData] = useState<AggregatedData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const salaries = await fetchSalaries();
        const aggregatedData = salaries.reduce((acc, salary) => {
          const existing = acc.find(item => item.year === salary.work_year);
          if (existing) {
            existing.totalJobs += 1;
            existing.averageSalary = (existing.averageSalary * (existing.totalJobs - 1) + salary.salary_in_usd) / existing.totalJobs;
          } else {
            acc.push({
              year: salary.work_year,
              totalJobs: 1,
              averageSalary: salary.salary_in_usd,
            });
          }
          return acc;
        }, [] as AggregatedData[]);
        setData(aggregatedData);
      } catch (error) {
        message.error('Error fetching data');
      }
    };
    getData();
  }, []);

  const columns: ColumnsType<AggregatedData> = [
    {
      title: 'Year',
      dataIndex: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      sorter: (a, b) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'averageSalary',
      sorter: (a, b) => a.averageSalary - b.averageSalary,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="year"
      onRow={(record) => ({
        onClick: () => onRowClick(record.year),
      })}
      pagination={{ pageSize: 5 }}
      bordered
      style={{
        background: 'linear-gradient(to right, #1890ff, #1d39c4)', 
        borderRadius: '10px', 
        border: 'none', 
      }}
      className="custom-table" 
    />
  );
};

export default MainTable;
