import axios from 'axios';

interface AnalysisResult {
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

export const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
  // Validate URL
  if (!isValidUrl(url)) {
    throw new Error('Please enter a valid URL');
  }

  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real implementation, this would call your backend API
  // For demo purposes, we'll generate realistic mock data
  const domain = new URL(url).hostname;
  const isSecure = url.startsWith('https://');
  const riskScore = calculateRiskScore(url, domain, isSecure);
  const contentType = detectContentType(url, domain);

  return {
    url,
    title: generateMockTitle(domain),
    description: generateMockDescription(domain),
    imageUrl: generateMockImage(domain),
    contentType,
    riskScore,
    isSecure,
    domain,
    timestamp: new Date().toISOString(),
    metadata: {
      author: generateMockAuthor(domain),
      publishDate: generateMockDate(),
      tags: generateMockTags(contentType),
      socialMedia: {
        twitter: `@${domain.split('.')[0]}`,
        facebook: `facebook.com/${domain.split('.')[0]}`,
        linkedin: `linkedin.com/company/${domain.split('.')[0]}`
      }
    }
  };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const calculateRiskScore = (url: string, domain: string, isSecure: boolean): number => {
  let score = 0;
  
  // Security check
  if (!isSecure) score += 30;
  
  // Domain reputation (simplified heuristics)
  const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.click', '.download'];
  if (suspiciousTlds.some(tld => domain.endsWith(tld))) score += 40;
  
  // URL patterns
  if (url.includes('bit.ly') || url.includes('tinyurl')) score += 10;
  if (url.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) score += 25; // IP addresses
  
  // Length and complexity
  if (url.length > 200) score += 15;
  if ((url.match(/[.-]/g) || []).length > 5) score += 10;
  
  // Trusted domains get lower scores
  const trustedDomains = ['google.com', 'github.com', 'stackoverflow.com', 'amazon.com', 'linkedin.com'];
  if (trustedDomains.some(trusted => domain.includes(trusted))) score = Math.max(0, score - 20);
  
  return Math.min(100, Math.max(0, score));
};

const detectContentType = (url: string, domain: string): string => {
  if (domain.includes('linkedin.com')) return 'Professional Network';
  if (domain.includes('github.com')) return 'Code Repository';
  if (domain.includes('amazon.com')) return 'E-commerce';
  if (domain.includes('youtube.com')) return 'Video Content';
  if (domain.includes('twitter.com')) return 'Social Media';
  if (domain.includes('facebook.com')) return 'Social Media';
  if (domain.includes('instagram.com')) return 'Social Media';
  if (domain.includes('news')) return 'News & Media';
  if (domain.includes('blog')) return 'Blog';
  if (domain.includes('wiki')) return 'Reference';
  if (url.includes('/api/')) return 'API Endpoint';
  if (url.includes('.pdf')) return 'PDF Document';
  if (url.includes('.doc')) return 'Document';
  
  return 'General Website';
};

const generateMockTitle = (domain: string): string => {
  const titles = {
    'google.com': 'Google Search - The World\'s Information',
    'github.com': 'GitHub - Where the World Builds Software',
    'stackoverflow.com': 'Stack Overflow - Where Developers Learn & Share',
    'amazon.com': 'Amazon - Earth\'s Most Customer-Centric Company',
    'linkedin.com': 'LinkedIn - Professional Network & Career Development',
    'youtube.com': 'YouTube - Broadcast Yourself',
    'twitter.com': 'Twitter - What\'s Happening',
    'facebook.com': 'Facebook - Connect with Friends and Family'
  };
  
  for (const [key, title] of Object.entries(titles)) {
    if (domain.includes(key)) return title;
  }
  
  return `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} - Official Website`;
};

const generateMockDescription = (domain: string): string => {
  const descriptions = {
    'google.com': 'Search the world\'s information including webpages, images, videos, news, and more.',
    'github.com': 'GitHub is where over 100 million developers shape the future of software, together.',
    'stackoverflow.com': 'Stack Overflow is the largest online community for programmers to learn, share their knowledge, and build their careers.',
    'amazon.com': 'Free shipping on millions of items. Shop online for electronics, books, apparel, and more.',
    'linkedin.com': 'Connect with professionals in your industry and grow your career with LinkedIn.',
    'youtube.com': 'Enjoy videos and music you love, upload original content, and share it with friends, family, and the world.',
    'twitter.com': 'From breaking news to entertainment, sports to politics – get the full story with all the live commentary.',
    'facebook.com': 'Connect with friends and family to share what\'s important to you.'
  };
  
  for (const [key, description] of Object.entries(descriptions)) {
    if (domain.includes(key)) return description;
  }
  
  return `Official website of ${domain}. Discover our products, services, and latest updates.`;
};

const generateMockImage = (domain: string): string => {
  // Using placeholder images that are more likely to exist
  const images = [
    'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];
  
  return images[Math.floor(Math.random() * images.length)];
};

const generateMockAuthor = (domain: string): string => {
  const authors = ['Editorial Team', 'Content Manager', 'Web Administrator', 'Communications Team'];
  return authors[Math.floor(Math.random() * authors.length)];
};

const generateMockDate = (): string => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000);
  return pastDate.toLocaleDateString();
};

const generateMockTags = (contentType: string): string[] => {
  const tagSets = {
    'E-commerce': ['shopping', 'retail', 'products', 'commerce'],
    'Social Media': ['social', 'networking', 'community', 'sharing'],
    'Code Repository': ['development', 'programming', 'code', 'software'],
    'News & Media': ['news', 'media', 'journalism', 'current events'],
    'Professional Network': ['career', 'professional', 'networking', 'jobs'],
    'Video Content': ['video', 'entertainment', 'media', 'streaming']
  };
  
  return tagSets[contentType] || ['web', 'online', 'digital', 'internet'];
};