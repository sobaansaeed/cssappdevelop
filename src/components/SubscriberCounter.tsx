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
          // Show fake count of 5000+ instead of actual count
          setCount(5000);
        }
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
        // Fallback to fake count even if API fails
        setCount(5000);
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