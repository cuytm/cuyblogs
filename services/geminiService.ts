
import { GoogleGenAI, Type } from "@google/genai";
import type { StudyGuide } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const studyGuideSchema = {
  type: Type.OBJECT,
  properties: {
    topic: {
      type: Type.STRING,
      description: 'The main topic of the study guide, as provided by the user.',
    },
    summary: {
      type: Type.STRING,
      description: 'A concise, one-paragraph summary of the entire topic.',
    },
    keyConcepts: {
      type: Type.ARRAY,
      description: 'A list of 3-5 essential terms or concepts and their definitions.',
      items: {
        type: Type.OBJECT,
        properties: {
          term: { type: Type.STRING, description: 'The key term or concept.' },
          definition: { type: Type.STRING, description: 'A clear and simple definition of the term.' },
        },
        required: ['term', 'definition'],
      },
    },
    mainTopics: {
      type: Type.ARRAY,
      description: 'A breakdown of 3-4 main sub-topics within the subject.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'The title of the sub-topic.' },
          explanation: { type: Type.STRING, description: 'A detailed explanation of the sub-topic in a few sentences.' },
        },
        required: ['title', 'explanation'],
      },
    },
    practiceQuestions: {
      type: Type.ARRAY,
      description: 'A set of 3 practice questions to test understanding.',
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: 'A question related to the topic.' },
          answer: { type: Type.STRING, description: 'The correct answer to the question.' },
        },
        required: ['question', 'answer'],
      },
    },
  },
  required: ['topic', 'summary', 'keyConcepts', 'mainTopics', 'practiceQuestions'],
};


export const generateStudyGuide = async (topic: string): Promise<StudyGuide> => {
  const prompt = `You are an expert educator and academic assistant. Your task is to create a comprehensive, well-structured study guide on the topic: "${topic}". 
  The guide should be clear, concise, and aimed at a high school or early college student. 
  Please provide the output in the requested JSON format, ensuring all fields are populated with high-quality content.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: studyGuideSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const studyGuideData: StudyGuide = JSON.parse(jsonText);
    return studyGuideData;

  } catch (error) {
    console.error("Error generating study guide from Gemini:", error);
    throw new Error("Failed to parse or retrieve the study guide from the AI service.");
  }
};
