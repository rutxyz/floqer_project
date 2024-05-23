import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import MainTable from './Components/MainTable';
import AggregatedTable from './Components/AggregatedTable';
import Analytics from './Components/Analytics';
import ChatApp from './Components/ChatApp'; 
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleRowClick = (year: number) => {
    setSelectedYear(prevYear => (prevYear === year ? null : year)); 
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '10px' }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>Salary Dashboard</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <MainTable onRowClick={handleRowClick} />
        
        {/* Display selected year if it's not null */}
       

        <h2>Line-Graph:</h2>
        <Analytics selectedYear={selectedYear} /> {/* Render Analytics component */}
        {selectedYear !== null && (
          <h2 style={{ marginBottom: '10px' }}>Selected Year: {selectedYear}</h2>
        )}
        <h2>Chat with Data Insights</h2>
        <ChatApp /> 
      
      </Content>
    </Layout>
  );
};

export default App;
