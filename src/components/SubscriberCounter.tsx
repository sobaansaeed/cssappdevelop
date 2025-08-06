'use client';

import React, { useState, useEffect } from 'react';

interface SubscriberCounterProps {
  className?: string;
  suffix?: string;
}

const SubscriberCounter: React.FC<SubscriberCounterProps> = ({ className = '', suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch('/api/subscribers');
        const data = await response.json();
        if (data.success) {
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriberCount();
  }, []);

  if (loading) {
    return <span className={className}>...</span>;
  }

  return (
    <span className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default SubscriberCounter; 