import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Users, Target, Award, Globe, Zap } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Shield, label: 'URLs Analyzed', value: '10M+', color: 'text-teal-400' },
    { icon: Users, label: 'Active Users', value: '50K+', color: 'text-cyan-400' },
    { icon: Target, label: 'Threats Blocked', value: '100K+', color: 'text-red-400' },
    { icon: Award, label: 'Uptime', value: '99.9%', color: 'text-green-400' },
  ];

  const team = [
    {
      name: 'Security Engineering',
      description: 'Expert security researchers and threat intelligence specialists',
      icon: Shield,
    },
    {
      name: 'Web Technology',
      description: 'Full-stack developers and web scraping specialists',
      icon: Globe,
    },
    {
      name: 'Performance',
      description: 'Infrastructure engineers optimizing for speed and reliability',
      icon: Zap,
    },
  ];

  return (
    <>
      <Helmet>
        <title>About LinkLens 2.0 - Smart URL Toolkit</title>
        <meta name="description" content="Learn about LinkLens 2.0's mission to provide secure, intelligent URL analysis and link management tools. Discover our technology, team, and commitment to web security." />
        <meta name="keywords" content="LinkLens about, URL security, web safety, link analysis company, cybersecurity tools" />
      </Helmet>

      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            About LinkLens 2.0
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to make the web safer and more transparent through intelligent URL analysis and secure link management.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-200">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              In an era where cyber threats are constantly evolving, LinkLens 2.0 stands as a guardian of web security. 
              We believe that every internet user deserves the tools to understand and verify the links they encounter online. 
              Our platform combines cutting-edge technology with intuitive design to deliver comprehensive URL analysis 
              that's both powerful and accessible.
            </p>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-200 text-center">Impact by the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <p className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What We Do */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-200 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">URL Security Analysis</h3>
              <p className="text-gray-400 mb-4">
                Our advanced security engine analyzes millions of URLs daily, checking against multiple threat 
                intelligence databases to identify malicious content, phishing attempts, and suspicious domains.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Real-time threat detection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Phishing protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Malware scanning</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Intelligent Link Management</h3>
              <p className="text-gray-400 mb-4">
                Beyond shortening, we provide comprehensive link management with built-in security verification, 
                custom branding options, and detailed analytics to help you understand link performance.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Custom branded links</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Automatic security checks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-gray-200 mb-8 text-center">Technology & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">{area.name}</h3>
                  <p className="text-gray-400">{area.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-200 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Privacy First</h3>
              <p className="text-gray-400">
                We never store personal data or track user behavior. Our analysis is performed in real-time 
                without retaining any user information or browsing history.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Open & Transparent</h3>
              <p className="text-gray-400">
                We believe in transparency about our methods and findings. Our analysis results include 
                detailed explanations of risk factors and security assessments.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">Continuous Innovation</h3>
              <p className="text-gray-400">
                The threat landscape evolves rapidly, and so do we. We continuously update our detection 
                algorithms and threat intelligence to stay ahead of emerging risks.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">User-Centric Design</h3>
              <p className="text-gray-400">
                Complex security analysis made simple. We design our tools to be powerful yet intuitive, 
                making web security accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-2xl p-8 border border-teal-400/20">
          <h2 className="text-3xl font-bold text-gray-200">Join Our Mission</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Help us make the web safer for everyone. Start using LinkLens 2.0 today and experience 
            the difference that intelligent URL analysis can make.
          </p>
          <button className="bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:from-teal-500 hover:to-cyan-500 transition-all transform hover:scale-105">
            Get Started Now
          </button>
        </section>
      </div>
    </>
  );
};

export default About;