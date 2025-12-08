/**
 * @file streamable http 服务 TODO 还没写，后边完善
 */

import { useState, useEffect } from 'react';

function StreamComponent() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/stream', {
        method: 'GET'
      });
      
      if (!response.body) return;
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        setData(prev => prev + chunk);
      }
    };

    fetchData();
  }, []);

  return (<>{data}</>);
}