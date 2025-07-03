import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, 
  Search, 
  Zap, 
  Globe, 
  Lock, 
  BarChart3, 
  Eye, 
  Link,
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Security Scanning',
      description: 'Multi-layered security analysis using industry-leading threat intelligence databases to detect malicious links, phishing attempts, and suspicious domains.',
      benefits: ['Real-time threat detection', 'Phishing protection', 'Malware scanning', 'Domain reputation analysis']
    },
    {
      icon: Search,
      title: 'Comprehensive URL Analysis',
      description: 'Extract complete metadata, SEO information, and technical details from any URL with our advanced web scraping technology.',
      benefits: ['Meta tags extraction', 'SEO analysis', 'Page performance metrics', 'Social media previews']
    },
    {
      icon: Link,
      title: 'Intelligent Link Shortening',
      description: 'Create secure, trackable short links with custom aliases and built-in security verification for every destination.',
      benefits: ['Custom aliases', 'Click tracking', 'Link analytics', 'Automatic security checks']
    },
    {
      icon: BarChart3,
      title: 'Risk Assessment Engine',
      description: 'Sophisticated algorithms analyze multiple risk factors to provide accurate threat assessments and safety recommendations.',
      benefits: ['Risk scoring', 'Detailed reports', 'Safety recommendations', 'Threat categorization']
    },
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Optimized for speed with sub-second response times and efficient processing of large-scale URL analysis requests.',
      benefits: ['Sub-second analysis', 'Bulk processing', 'Real-time results', 'High availability']
    },
    {
      icon: Globe,
      title: 'Global CDN & Reliability',
      description: 'Distributed infrastructure ensures fast, reliable access worldwide with 99.9% uptime guarantee.',
      benefits: ['Global CDN', '99.9% uptime', 'Load balancing', 'Geographic redundancy']
    }
  ];

  const useCases = [
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Protect your organization from malicious links in emails, documents, and communications.',
      color: 'text-blue-400'
    },
    {
      icon: Eye,
      title: 'Digital Marketing',
      description: 'Analyze competitor links, track campaign performance, and ensure brand safety.',
      color: 'text-purple-400'
    },
    {
      icon: AlertTriangle,
      title: 'Threat Research',
      description: 'Investigate suspicious URLs safely without exposing your systems to potential threats.',
      color: 'text-red-400'
    },
    {
      icon: CheckCircle,
      title: 'Content Moderation',
      description: 'Automatically verify and approve user-submitted links in forums, social platforms, and communities.',
      color: 'text-green-400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - LinkLens 2.0 Smart URL Toolkit</title>
        <meta name="description" content="Discover the powerful features of LinkLens 2.0: advanced security scanning, comprehensive URL analysis, intelligent link shortening, and enterprise-grade reliability." />
        <meta name="keywords" content="URL analysis features, link security, web scraping, threat detection, link shortener features" />
      </Helmet>

      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            LinkLens 2.0 combines cutting-edge technology with intuitive design to deliver 
            the most comprehensive URL analysis and link management platform available.
          </p>
        </div>

        {/* Core Features */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-200 text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-400/50 transition-all">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-200 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={`w-6 h-6 ${useCase.color}`} />
                    <h3 className="text-lg font-semibold text-gray-200">{useCase.title}</h3>
                  </div>
                  <p className="text-gray-400">{useCase.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-gray-200 mb-8 text-center">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Response Time</h3>
              <p className="text-2xl font-bold text-teal-400">&lt;500ms</p>
              <p className="text-sm text-gray-400">Average analysis time</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Security Checks</h3>
              <p className="text-2xl font-bold text-teal-400">15+</p>
              <p className="text-sm text-gray-400">Threat detection layers</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Global Reach</h3>
              <p className="text-2xl font-bold text-teal-400">99.9%</p>
              <p className="text-sm text-gray-400">Uptime guarantee</p>
            </div>
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Compatibility</h3>
              <p className="text-2xl font-bold text-teal-400">100%</p>
              <p className="text-sm text-gray-400">Cross-platform support</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-2xl p-8 border border-teal-400/20">
          <h2 className="text-3xl font-bold text-gray-200">Ready to Get Started?</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Experience the power of LinkLens 2.0 today. Start analyzing URLs and creating secure short links in seconds.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:from-teal-500 hover:to-cyan-500 transition-all transform hover:scale-105">
              Start Analyzing
            </button>
            <button className="bg-gray-700 text-gray-200 font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all">
              Learn More
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;