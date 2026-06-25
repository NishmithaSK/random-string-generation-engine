import { useState, useCallback, useEffect } from 'react';

export default function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedString, setGeneratedString] = useState('');
  const [copied, setCopied] = useState(false);

  // Hook 1: useCallback to cache generation logic
  const generateRandomString = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setGeneratedString('Select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    
    setGeneratedString(result);
    setCopied(false); 
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Hook 2: useEffect to auto-fire changes on control updates
  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const copyToClipboard = () => {
    if (generatedString && generatedString !== 'Select at least one option') {
      window.navigator.clipboard.writeText(generatedString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans antialiased text-slate-200">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6">
        
        {/* Project Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white tracking-wide">Random String Generation Engine</h2>
          <p className="text-slate-400 text-xs font-medium mt-1 tracking-wide">
            Making random strings click.
          </p>
        </div>

        {/* Output Row */}
        <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 mb-6">
          <input
            type="text"
            className="w-full bg-transparent outline-none pr-12 font-mono text-base font-semibold tracking-wide text-indigo-400 overflow-x-auto"
            value={generatedString}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            disabled={generatedString === 'Select at least one option'}
            className="absolute right-3 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-xs font-semibold rounded-lg border border-slate-800 text-slate-300 disabled:opacity-30 transition-all"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Controls Layout */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">String Length</label>
              <span className="text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 outline-none"
            />
          </div>

          <div className="pt-2 border-t border-slate-800/60 space-y-3.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Include Parameters</label>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Uppercase Letters (A-Z)</span>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Lowercase Letters (a-z)</span>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Numeric Digits (0-9)</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Special Symbols (#&%)</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={generateRandomString}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/10 tracking-wide mt-2"
          >
            Force Regenerate String
          </button>
        </div>

      </div>
    </div>
  );
}