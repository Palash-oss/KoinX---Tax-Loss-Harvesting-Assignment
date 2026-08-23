import React, { useState } from 'react';

interface CoinIconProps {
  coin: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BRAND_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  BTC: { bg: 'bg-amber-500', text: 'text-white', label: '₿' },
  ETH: { bg: 'bg-indigo-600', text: 'text-white', label: 'Ξ' },
  USDT: { bg: 'bg-emerald-500', text: 'text-white', label: '₮' },
  USDC: { bg: 'bg-blue-500', text: 'text-white', label: '$' },
  MATIC: { bg: 'bg-purple-600', text: 'text-white', label: 'M' },
  SOL: { bg: 'bg-gradient-to-tr from-purple-500 to-teal-400', text: 'text-white', label: 'S' },
  WETH: { bg: 'bg-slate-700', text: 'text-white', label: 'W' },
  WPOL: { bg: 'bg-violet-600', text: 'text-white', label: 'P' },
  GONE: { bg: 'bg-pink-600', text: 'text-white', label: 'G' },
  SLN: { bg: 'bg-teal-600', text: 'text-white', label: 'S' },
  OX: { bg: 'bg-sky-600', text: 'text-white', label: 'OX' },
  FLAME: { bg: 'bg-orange-600', text: 'text-white', label: 'F' },
  PIG: { bg: 'bg-rose-500', text: 'text-white', label: 'P' },
  $CULO: { bg: 'bg-yellow-600', text: 'text-white', label: 'C' },
  CULO: { bg: 'bg-yellow-600', text: 'text-white', label: 'C' },
  QUICK: { bg: 'bg-cyan-600', text: 'text-white', label: 'Q' },
  DFYN: { bg: 'bg-blue-600', text: 'text-white', label: 'D' },
  LINK: { bg: 'bg-blue-700', text: 'text-white', label: '⬡' },
  BLOK: { bg: 'bg-purple-700', text: 'text-white', label: 'B' },
  SPHERE: { bg: 'bg-indigo-500', text: 'text-white', label: 'S' },
  TRADE: { bg: 'bg-amber-600', text: 'text-white', label: 'T' },
  WELT: { bg: 'bg-emerald-600', text: 'text-white', label: 'W' },
  FTM: { bg: 'bg-blue-600', text: 'text-white', label: 'F' },
  EZ: { bg: 'bg-indigo-600', text: 'text-white', label: 'E' },
  FRM: { bg: 'bg-red-600', text: 'text-white', label: 'F' },
  TITAN: { bg: 'bg-slate-800', text: 'text-white', label: 'Ti' },
};

export const CoinIcon: React.FC<CoinIconProps> = ({ coin, logoUrl, size = 'md' }) => {
  const [imgError, setImgError] = useState(false);
  const normalizedCoin = coin.replace('$', '').toUpperCase();
  const brand = BRAND_COLORS[normalizedCoin] || { bg: 'bg-blue-600', text: 'text-white', label: normalizedCoin.substring(0, 2) };

  const sizeClasses =
    size === 'sm' ? 'w-6 h-6 text-2xs' : size === 'lg' ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs';

  // Use image if valid and not errored
  const isDefaultSvg = logoUrl?.includes('DefaultCoin.svg');

  if (logoUrl && !imgError && !isDefaultSvg) {
    return (
      <div className={`${sizeClasses} rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs`}>
        <img
          src={logoUrl}
          alt={coin}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover p-0.5"
        />
      </div>
    );
  }

  // Fallback to crisp branded icon badge
  return (
    <div
      className={`${sizeClasses} ${brand.bg} ${brand.text} rounded-full flex items-center justify-center font-black tracking-tight shrink-0 shadow-xs border border-white/20 dark:border-slate-700`}
      title={coin}
    >
      {brand.label}
    </div>
  );
};
