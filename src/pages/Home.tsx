import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, AlertTriangle, Shield, Globe } from 'lucide-react';
import AnalysisDisplay from '../components/AnalysisDisplay';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { analyzeUrl } from '../services/urlAnalyzer';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeUrl(url);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>LinkLens: Instant URL Analyzer & Risk Scanner</title>
        <meta name="description" content="Analyze any URL instantly with our advanced security scanner. Get metadata, risk assessment, and detailed insights about any website or link." />
        <meta name="keywords" content="URL analyzer, security scanner, link checker, metadata extractor, website analyzer" />
      </Helmet>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            URL Analyzer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Instantly analyze any URL for security risks, metadata, and performance insights. 
            Our advanced scanner provides comprehensive analysis to keep you safe online.
          </p>
        </div>

        {/* Analysis Form */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                Enter URL to analyze
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  required
                />
                <Globe className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Analyze Link</span>
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {isLoading && <LoadingSkeleton />}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {result && <AnalysisDisplay analysis={result} />}

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Shield className="w-8 h-8 text-teal-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Security Scanning</h3>
            <p className="text-gray-400 text-sm">Advanced threat detection and risk assessment</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Globe className="w-8 h-8 text-teal-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Metadata Extraction</h3>
            <p className="text-gray-400 text-sm">Complete page information and SEO analysis</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Search className="w-8 h-8 text-teal-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Instant Analysis</h3>
            <p className="text-gray-400 text-sm">Real-time scanning with comprehensive reports</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;