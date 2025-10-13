import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, hint, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-900">{label}</label>
      <textarea
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-rose-500'
        } ${className}`}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
};

export default Textarea;