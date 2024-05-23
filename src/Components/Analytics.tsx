import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SalaryData } from '../types';
import { fetchSalaries } from '../api';

interface AggregatedJobData {
  title: string;
  jobs: number;
}

const Analytics: React.FC<{ selectedYear: number | null }> = ({ selectedYear }) => {
  const [data, setData] = useState<SalaryData[]>([]);
  const [jobData, setJobData] = useState<AggregatedJobData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const salaries = await fetchSalaries();
      setData(salaries);
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectedYear !== null) {
      const selectedYearData = data.filter(salary => salary.work_year === selectedYear);
      const aggregatedJobData = selectedYearData.reduce((acc, salary) => {
        const existing = acc.find(item => item.title === salary.job_title);
        if (existing) {
          existing.jobs += 1;
        } else {
          acc.push({ title: salary.job_title, jobs: 1 });
        }
        return acc;
      }, [] as AggregatedJobData[]);
      setJobData(aggregatedJobData);
    }
  }, [selectedYear, data]);

  const uniqueYears = Array.from(new Set(data.map(item => item.work_year)));

  const renderLineChart = (
    <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" activeDot={{ r: 8 }} key="totalJobs" />
  );

  const columns: ColumnsType<AggregatedJobData> = [
    {
      title: 'Job Title',
      dataIndex: 'title',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'jobs',
    },
  ];

  return (
    <div>
      <LineChart
        width={800}
        height={400}
        data={uniqueYears.map(year => ({ year, totalJobs: data.filter(d => d.work_year === year).length }))}
        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis
          label={{ value: 'Total Jobs', angle: -90, position: 'insideLeft', offset: -10 }}
          domain={[0, 'auto']}
        />
        <Tooltip />
        <Legend />
        {renderLineChart}
      </LineChart>

      {selectedYear !== null && (
        <Table
          columns={columns}
          dataSource={jobData}
          rowKey="title"
          pagination={false}
        />
      )}
    </div>
  );
};

export default Analytics;
