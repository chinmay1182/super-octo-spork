"use client"
import { Suspense } from 'react';
import Analytics from './Analytics';

const AnalyticsWrapper = () => {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  );
};

export default AnalyticsWrapper;