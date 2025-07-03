import React from 'react';
import { ExternalLink, Calendar, Globe, Tag, AlertTriangle } from 'lucide-react';
import RiskMeter from './RiskMeter';

interface AnalysisData {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  contentType: string;
  riskScore: number;
  isSecure: boolean;
  domain: string;
  timestamp: string;
  metadata?: {
    author?: string;
    publishDate?: string;
    tags?: string[];
    socialMedia?: {
      twitter?: string;
      facebook?: string;
      linkedin?: string;
    };
  };
}

interface AnalysisDisplayProps {
  analysis: AnalysisData;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const {
    url,
    title,
    description,
    imageUrl,
    contentType,
    riskScore,
    isSecure,
    domain,
    timestamp,
    metadata
  } = analysis;

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{domain}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(timestamp).toLocaleDateString()}</span>
            </span>
            {!isSecure && (
              <span className="flex items-center space-x-1 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Not Secure</span>
              </span>
            )}
          </div>
        </div>
        
        {imageUrl && (
          <div className="ml-4">
            <img
              src={imageUrl}
              alt="Page preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-600"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Risk Assessment */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-200">Security Assessment</h4>
        <RiskMeter riskScore={riskScore} />
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h5 className="font-medium text-gray-200 mb-2">Content Type</h5>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-400/20 text-teal-400">
              {contentType}
            </span>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h5 className="font-medium text-gray-200 mb-2">Security Status</h5>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isSecure 
                ? 'bg-green-400/20 text-green-400' 
                : 'bg-red-400/20 text-red-400'
            }`}>
              {isSecure ? 'Secure (HTTPS)' : 'Not Secure (HTTP)'}
            </span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      {metadata && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-200">Additional Information</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {metadata.author && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-1">Author</h5>
                <p className="text-gray-400 text-sm">{metadata.author}</p>
              </div>
            )}
            
            {metadata.publishDate && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-1">Published</h5>
                <p className="text-gray-400 text-sm">{metadata.publishDate}</p>
              </div>
            )}
          </div>
          
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="font-medium text-gray-200 mb-2 flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Tags</span>
              </h5>
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-500">
          Analyzed {new Date(timestamp).toLocaleString()}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
        >
          <span>Visit Link</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default AnalysisDisplay;