import React from 'react';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

interface RiskMeterProps {
  riskScore: number; // 0-100
}

const RiskMeter: React.FC<RiskMeterProps> = ({ riskScore }) => {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return 'safe';
    if (score <= 70) return 'caution';
    return 'high';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-green-400';
      case 'caution': return 'bg-yellow-400';
      case 'high': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-400';
      case 'caution': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return Shield;
      case 'caution': return AlertTriangle;
      case 'high': return AlertCircle;
      default: return Shield;
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'safe': return 'Safe';
      case 'caution': return 'Caution';
      case 'high': return 'High Risk';
      default: return 'Unknown';
    }
  };

  const riskLevel = getRiskLevel(riskScore);
  const riskColor = getRiskColor(riskLevel);
  const riskTextColor = getRiskTextColor(riskLevel);
  const RiskIcon = getRiskIcon(riskLevel);
  const riskLabel = getRiskLabel(riskLevel);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <RiskIcon className={`w-5 h-5 ${riskTextColor}`} />
          <span className={`font-medium ${riskTextColor}`}>{riskLabel}</span>
        </div>
        <span className="text-sm text-gray-400">Risk Score: {riskScore}/100</span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${riskColor}`}
            style={{ width: `${Math.min(riskScore, 100)}%` }}
          />
        </div>
        
        {/* Risk threshold markers */}
        <div className="absolute top-0 left-[30%] w-0.5 h-3 bg-gray-600" />
        <div className="absolute top-0 left-[70%] w-0.5 h-3 bg-gray-600" />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Safe</span>
        <span>Caution</span>
        <span>High Risk</span>
      </div>
    </div>
  );
};

export default RiskMeter;