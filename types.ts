
export interface KeyConcept {
  term: string;
  definition: string;
}

export interface MainTopic {
  title: string;
  explanation: string;
}

export interface PracticeQuestion {
  question: string;
  answer: string;
}

export interface StudyGuide {
  topic: string;
  summary: string;
  keyConcepts: KeyConcept[];
  mainTopics: MainTopic[];
  practiceQuestions: PracticeQuestion[];
}
