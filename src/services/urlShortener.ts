import { nanoid } from 'nanoid';

interface ShortenResult {
  success: boolean;
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
  analysis: any;
}

export const shortenUrl = async (longUrl: string, customAlias?: string): Promise<ShortenResult> => {
  // Validate URL
  if (!isValidUrl(longUrl)) {
    throw new Error('Please enter a valid URL');
  }

  // Check if custom alias is valid
  if (customAlias && !isValidAlias(customAlias)) {
    throw new Error('Custom alias can only contain letters, numbers, hyphens, and underscores');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate short code
  const shortCode = customAlias || nanoid(8);
  const shortUrl = `https://lnk.ls/${shortCode}`;

  // In a real implementation, you would:
  // 1. Save the mapping to your database
  // 2. Check if custom alias is available
  // 3. Return the actual short URL from your domain

  // For demo purposes, we'll simulate checking if custom alias exists
  if (customAlias) {
    const existingAliases = ['admin', 'api', 'www', 'mail', 'test'];
    if (existingAliases.includes(customAlias.toLowerCase())) {
      throw new Error('This custom alias is already taken. Please choose another one.');
    }
  }

  // Import and use the URL analyzer
  const { analyzeUrl } = await import('./urlAnalyzer');
  const analysis = await analyzeUrl(longUrl);

  return {
    success: true,
    shortUrl,
    shortCode,
    originalUrl: longUrl,
    analysis
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

const isValidAlias = (alias: string): boolean => {
  return /^[a-zA-Z0-9-_]+$/.test(alias);
};