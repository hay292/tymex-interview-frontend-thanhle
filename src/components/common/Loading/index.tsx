import { Progress } from 'antd';
import { useEffect, useState } from 'react';
import './styles.css';

const Loading = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 100) {
          return 0;
        }
        return prevPercent + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <Progress
      percent={percent}
      showInfo={false}
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      status="active"
      className="loading-progress"
    />
  );
};

export default Loading; 