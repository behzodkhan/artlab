import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-lime-600">Thank You for Your Contribution!</h1>
        <p className="text-gray-600 mb-8">
          Your submission has been received and will be reviewed by our team.
        </p>
        <Link to="/">
          <Button className="bg-lime-500 hover:bg-lime-600 w-full py-3 mb-4">
            Return to Home
          </Button>
        </Link>
        <p className="text-gray-600">
          Or you can check your contribution's status{' '}
          <Link to="/waiting" className="text-lime-600 font-semibold underline hover:text-lime-700">
            Here
          </Link>.
        </p>
      </div>
    </div>
  );
}

export default SuccessPage;