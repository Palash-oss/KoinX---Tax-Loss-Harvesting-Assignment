import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, ariaLabel }) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel || 'Select item'}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`w-5 h-5 rounded flex items-center justify-center transition-all duration-150 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
        checked
          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
          : 'bg-white border-slate-300 hover:border-blue-400 text-transparent'
      }`}
    >
      <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
    </button>
  );
};
