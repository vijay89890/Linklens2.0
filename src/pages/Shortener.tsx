import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Copy, Check, Shield, Zap } from 'lucide-react';
import AnalysisDisplay from '../components/AnalysisDisplay';
import { shortenUrl } from '../services/urlShortener';

const Shortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await shortenUrl(longUrl, customAlias);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while shortening the URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Safe Link Shortener by LinkLens</title>
        <meta name="description" content="Create secure shortened links with built-in security analysis. Our intelligent link shortener provides safety verification and detailed analytics." />
        <meta name="keywords" content="link shortener, URL shortener, secure links, safe links, link analytics" />
      </Helmet>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center">
              <Link className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Safe Link Shortener
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create secure, trackable short links with built-in security analysis. 
            Every link is automatically scanned for threats before shortening.
          </p>
        </div>

        {/* Shortener Form */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="longUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Your long URL
              </label>
              <input
                type="url"
                id="longUrl"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="customAlias" className="block text-sm font-medium text-gray-300 mb-2">
                Custom alias (optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm">lnk.ls/</span>
                <input
                  type="text"
                  id="customAlias"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-16 pr-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  pattern="[a-zA-Z0-9-_]+"
                  title="Only letters, numbers, hyphens, and underscores allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Leave empty for auto-generated short code</p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating & Analyzing...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Shorten & Analyze</span>
                </span>
              )}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Check className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-green-400">Link Created Successfully!</h3>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Your shortened link:</p>
                  <p className="text-teal-400 font-mono text-lg break-all">{result.shortUrl}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 bg-teal-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors flex items-center space-x-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {result?.analysis && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-200 flex items-center space-x-2">
              <Shield className="w-6 h-6 text-teal-400" />
              <span>Security Analysis</span>
            </h2>
            <AnalysisDisplay analysis={result.analysis} />
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="bg-gray-800 rounded-xl p-6">
            <Shield className="w-8 h-8 text-teal-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Security First</h3>
            <p className="text-gray-400 text-sm">Every link is automatically scanned for threats and malicious content before shortening.</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <Zap className="w-8 h-8 text-teal-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Instant link creation with real-time security analysis and metadata extraction.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shortener;