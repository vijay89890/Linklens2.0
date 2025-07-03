import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, Plus } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroidDevice = /Android/.test(userAgent);
    const isDesktopDevice = !isIOSDevice && !isAndroidDevice;
    
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsDesktop(isDesktopDevice);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isStandalone || isInWebAppiOS || isInWebAppChrome) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('App installed');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For browsers that don't support beforeinstallprompt, show manual instructions
    const timer = setTimeout(() => {
      if (!isInstalled && !deferredPrompt) {
        console.log('Showing manual install prompt');
        setShowInstallPrompt(true);
      }
    }, 5000); // Show after 5 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [isInstalled, deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('Using native install prompt');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Install prompt outcome:', outcome);
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    } else {
      // Show manual install instructions
      showManualInstallInstructions();
    }
  };

  const showManualInstallInstructions = () => {
    let instructions = '';
    let title = 'Install LinkLens';
    
    if (isIOS) {
      instructions = `To install LinkLens on your iPhone/iPad:
      
1. Tap the Share button (square with arrow) at the bottom of Safari
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" to confirm
      
The app will appear on your home screen like a native app!`;
    } else if (isAndroid) {
      instructions = `To install LinkLens on your Android device:
      
1. Tap the menu (⋮) in your browser
2. Look for "Add to Home Screen" or "Install App"
3. Tap "Install" or "Add"
      
You can also look for an install icon in the address bar!`;
    } else {
      instructions = `To install LinkLens on your computer:
      
1. Look for an install icon (⊕ or download symbol) in your browser's address bar
2. Click it and select "Install"
3. Or use your browser's menu and look for "Install LinkLens" option
      
Supported browsers: Chrome, Edge, Firefox, Safari`;
    }
    
    // Create a modal-like alert
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: #1f2937;
      color: #f3f4f6;
      padding: 24px;
      border-radius: 12px;
      max-width: 400px;
      width: 100%;
      border: 1px solid #374151;
    `;
    
    content.innerHTML = `
      <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #2dd4bf;">${title}</h3>
      <p style="margin: 0 0 20px 0; white-space: pre-line; line-height: 1.5; color: #d1d5db;">${instructions}</p>
      <button onclick="this.closest('div').remove()" style="
        background: linear-gradient(to right, #2dd4bf, #06b6d4);
        color: #111827;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
      ">Got it!</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Remove modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  if (!showInstallPrompt) {
    return null;
  }

  const getInstallIcon = () => {
    if (isIOS) return Plus;
    if (isAndroid) return Download;
    return Monitor;
  };

  const getInstallText = () => {
    if (deferredPrompt) return 'Install App';
    if (isIOS) return 'Add to Home Screen';
    if (isAndroid) return 'Install App';
    return 'Install LinkLens';
  };

  const InstallIcon = getInstallIcon();

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-2xl animate-slide-up">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <InstallIcon className="w-5 h-5 text-teal-400" />
            <h3 className="font-semibold text-gray-200">Install LinkLens</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-4">
          {deferredPrompt 
            ? "Install LinkLens for quick access and offline functionality. Works like a native app!"
            : "Add LinkLens to your home screen for easy access and app-like experience!"
          }
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-gradient-to-r from-teal-400 to-cyan-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:from-teal-500 hover:to-cyan-500 transition-all flex items-center justify-center space-x-2"
          >
            <InstallIcon className="w-4 h-4" />
            <span>{getInstallText()}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;