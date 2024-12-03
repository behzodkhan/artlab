// LoadingSpinner.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

const LoadingSpinner = ({context}) => (
  <div className="flex flex-col justify-center items-center py-20">
    <Loader2 className="animate-spin h-12 w-12 text-lime-500 mb-4" />
    <p className="text-xl font-semibold text-gray-700">{context}</p>
  </div>
);

export default LoadingSpinner;