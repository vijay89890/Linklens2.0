import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, AlertTriangle, Loader } from 'lucide-react';

const Redirect: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [status, setStatus] = useState<'loading' | 'found' | 'not-found'>('loading');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setStatus('not-found');
        return;
      }

      try {
        // Simulate API call to find the original URL
        // In a real implementation, this would call your backend
        const mockLinks: { [key: string]: string } = {
          'demo': 'https://example.com',
          'test': 'https://google.com',
          'sample': 'https://github.com',
        };

        const foundUrl = mockLinks[shortCode];
        
        if (foundUrl) {
          setOriginalUrl(foundUrl);
          setStatus('found');
          
          // Start countdown
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                window.location.href = foundUrl;
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        } else {
          setStatus('not-found');
        }
      } catch (error) {
        setStatus('not-found');
      }
    };

    handleRedirect();
  }, [shortCode]);

  const handleDirectRedirect = () => {
    if (originalUrl) {
      window.location.href = originalUrl;
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
          <p className="text-gray-400">Looking up link...</p>
        </div>
      </div>
    );
  }

  if (status === 'not-found') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-200">Link Not Found</h1>
          <p className="text-gray-400">
            The short link you're looking for doesn't exist or has expired.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:from-teal-500 hover:to-cyan-500 transition-all"
          >
            Return to LinkLens
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <ExternalLink className="w-16 h-16 text-teal-400 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-200">Redirecting...</h1>
        <p className="text-gray-400">
          You will be redirected to:<br />
          <span className="text-teal-400 font-mono break-all">{originalUrl}</span>
        </p>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-300 mb-2">
            Redirecting in <span className="text-teal-400 font-bold">{countdown}</span> seconds
          </p>
          <button
            onClick={handleDirectRedirect}
            className="bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:from-teal-500 hover:to-cyan-500 transition-all"
          >
            Go Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Redirect;