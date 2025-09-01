
import React, { useState, useCallback } from 'react';
import type { StudyGuide } from './types';
import { generateStudyGuide } from './services/geminiService';
import TopicInputForm from './components/TopicInputForm';
import StudyGuideDisplay from './components/StudyGuideDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { BrainCircuitIcon, SparklesIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate a study guide.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStudyGuide(null);

    try {
      const guide = await generateStudyGuide(topic);
      setStudyGuide(guide);
    } catch (err) {
      console.error(err);
      setError('Failed to generate study guide. The topic might be too complex or the AI service is currently unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <BrainCircuitIcon className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              AI Study Guide Generator
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Unlock your learning potential. Enter any topic and receive a structured, comprehensive study guide in seconds.
          </p>
        </header>

        <TopicInputForm
          topic={topic}
          setTopic={setTopic}
          isLoading={isLoading}
          onSubmit={handleGenerate}
        />

        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {studyGuide && <StudyGuideDisplay guide={studyGuide} />}
          {!isLoading && !error && !studyGuide && (
             <div className="text-center text-slate-500 p-8 border-2 border-dashed border-slate-700 rounded-2xl max-w-3xl mx-auto">
                <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-slate-600"/>
                <h2 className="text-2xl font-bold text-slate-400 mb-2">Ready to Start Studying?</h2>
                <p>Your generated study guide will appear here once you enter a topic above.</p>
             </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-600">
        <p>Powered by Gemini AI. Your intelligent study partner.</p>
      </footer>
    </div>
  );
};

export default App;
