
import React from 'react';
import { SparklesIcon } from './IconComponents';

interface TopicInputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const TopicInputForm: React.FC<TopicInputFormProps> = ({ topic, setTopic, isLoading, onSubmit }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-full p-2 shadow-lg focus-within:ring-2 focus-within:ring-cyan-500 transition-all duration-300">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The Renaissance, Quantum Physics, React Hooks..."
          className="w-full bg-transparent text-lg text-slate-300 placeholder-slate-500 border-none focus:ring-0 px-4 py-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold rounded-full px-6 py-3 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <SparklesIcon className="w-5 h-5" />
          <span>{isLoading ? 'Generating...' : 'Generate'}</span>
        </button>
      </div>
    </form>
  );
};

export default TopicInputForm;
