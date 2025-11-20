import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartDisplay = ({ data }) => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>📈 Market Trends Analysis</h3>
        <p>Property sales and transaction insights over time</p>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis 
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a5568', fontSize: 12, fontWeight: 500 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a5568', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(10px)',
                fontSize: '14px',
                fontWeight: '500'
              }}
              itemStyle={{ color: '#4a5568' }}
              labelStyle={{ color: '#2d3748', fontWeight: '600', marginBottom: '5px' }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingBottom: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="total_sales" 
              stroke="#667eea"
              strokeWidth={3}
              dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#667eea', stroke: '#fff', strokeWidth: 2 }}
              name="Sales Volume"
            />
            <Line 
              type="monotone" 
              dataKey="total_sold" 
              stroke="#48bb78"
              strokeWidth={3}
              dot={{ fill: '#48bb78', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#48bb78', stroke: '#fff', strokeWidth: 2 }}
              name="Properties Sold"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartDisplay;