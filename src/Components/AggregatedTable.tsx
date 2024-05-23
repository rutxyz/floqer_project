import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { SalaryData } from '../types';
import { fetchSalaries } from '../api';

interface AggregatedJobData {
  jobTitle: string;
  jobCount: number;
}

interface AggregatedTableProps {
  year: number;
  visible: boolean; 
}

const AggregatedTable: React.FC<AggregatedTableProps> = ({ year, visible }) => {
  const [data, setData] = useState<AggregatedJobData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const salaries = await fetchSalaries();
        const filteredData = salaries.filter(salary => salary.work_year === year);
        const aggregatedData = filteredData.reduce((acc, salary) => {
          const existing = acc.find(item => item.jobTitle === salary.job_title);
          if (existing) {
            existing.jobCount += 1;
          } else {
            acc.push({
              jobTitle: salary.job_title,
              jobCount: 1,
            });
          }
          return acc;
        }, [] as AggregatedJobData[]);
        setData(aggregatedData);
      } catch (error) {
        message.error('Error fetching data');
      }
    };

    getData();
  }, [year]);

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'jobCount',
    },
  ];

  return visible ? (
    <div>
      
      <Table
        columns={columns}
        dataSource={data}
        rowKey="jobTitle"
        pagination={false}
        bordered
        style={{ marginTop: '30px' }}
      />
      
    </div>
  ) : null;
};

export default AggregatedTable;
