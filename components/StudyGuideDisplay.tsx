
import React from 'react';
import type { StudyGuide } from '../types';
import { BookOpenIcon, LightbulbIcon, QuestionMarkCircleIcon, ClipboardDocumentIcon } from './IconComponents';

interface StudyGuideDisplayProps {
  guide: StudyGuide;
}

const StudyGuideDisplay: React.FC<StudyGuideDisplayProps> = ({ guide }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <ClipboardDocumentIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-cyan-400">Summary</h2>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed">{guide.summary}</p>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <LightbulbIcon className="w-8 h-8 text-amber-400" />
          <h2 className="text-3xl font-bold text-amber-400">Key Concepts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guide.keyConcepts.map((concept, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500 transition-colors duration-300">
              <h3 className="font-bold text-xl text-amber-300 mb-2">{concept.term}</h3>
              <p className="text-slate-300">{concept.definition}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <BookOpenIcon className="w-8 h-8 text-fuchsia-400" />
          <h2 className="text-3xl font-bold text-fuchsia-400">Main Topics</h2>
        </div>
        <div className="space-y-6">
          {guide.mainTopics.map((topic, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-xl text-fuchsia-300 mb-2">{topic.title}</h3>
              <p className="text-slate-300 leading-relaxed">{topic.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <QuestionMarkCircleIcon className="w-8 h-8 text-emerald-400" />
          <h2 className="text-3xl font-bold text-emerald-400">Practice Questions</h2>
        </div>
        <div className="space-y-4">
          {guide.practiceQuestions.map((qa, index) => (
            <details key={index} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 cursor-pointer group">
              <summary className="font-semibold text-lg text-emerald-300 list-none flex justify-between items-center">
                {qa.question}
                 <svg className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-slate-300"><strong className="text-emerald-400">Answer:</strong> {qa.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudyGuideDisplay;
