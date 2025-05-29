import React, { useState } from 'react';
import { Brain, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  courseCode: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QUESTIONS: Question[] = [
  {
    id: "1",
    courseCode: "IYAB102",
    question: "Aşağıdakilerden hangisi acil hasta bakımında ABC'nin açılımıdır?",
    options: [
      "Airway, Breathing, Circulation",
      "Accident, Bleeding, Consciousness",
      "Alert, Balance, Control",
      "Assist, Backup, Care"
    ],
    correctAnswer: 0
  },
  {
    id: "2",
    courseCode: "IYAB108",
    question: "Hangi ilaç grubu akut miyokard infarktüsü tedavisinde kullanılmaz?",
    options: [
      "Antikoagülanlar",
      "Beta blokerler",
      "Antidepresanlar",
      "Nitratlar"
    ],
    correctAnswer: 2
  },
  {
    id: "3",
    courseCode: "IYAB110",
    question: "Travma hastasında ilk değerlendirmede öncelik hangisidir?",
    options: [
      "Kırıkların tespiti",
      "Bilinç durumu kontrolü",
      "Havayolu açıklığının sağlanması",
      "Kanama kontrolü"
    ],
    correctAnswer: 2
  },
  {
    id: "4",
    courseCode: "IYAB112",
    question: "112 Acil Sağlık Hizmetlerinde triaj renk kodlamasında en acil durum hangi renkle gösterilir?",
    options: [
      "Yeşil",
      "Sarı",
      "Kırmızı",
      "Siyah"
    ],
    correctAnswer: 2
  }
];

interface QuizProps {
  courseCode: string;
}

export function Quiz({ courseCode }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const courseQuestions = QUESTIONS.filter(q => q.courseCode === courseCode);
  const currentQuestion = courseQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < courseQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  if (courseQuestions.length === 0) {
    return (
      <div className="text-center p-4">
        <Brain className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">Bu ders için henüz soru bulunmamaktadır.</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="mt-4 text-xl font-bold">Test Tamamlandı!</h3>
        <p className="mt-2 text-gray-600">
          {courseQuestions.length} sorudan {correctAnswers} doğru cevap
        </p>
        <p className="mt-1 text-gray-600">
          Başarı oranı: {Math.round((correctAnswers / courseQuestions.length) * 100)}%
        </p>
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Testi Tekrar Başlat
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Soru {currentQuestionIndex + 1}/{courseQuestions.length}
          </span>
          <span className="text-sm text-gray-500">
            Doğru: {correctAnswers}
          </span>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{currentQuestion.question}</h3>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              showResult
                ? index === currentQuestion.correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : index === selectedAnswer
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-50 text-gray-800'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
            }`}
          >
            {option}
            {showResult && index === currentQuestion.correctAnswer && (
              <CheckCircle className="inline ml-2 h-5 w-5 text-green-600" />
            )}
            {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
              <XCircle className="inline ml-2 h-5 w-5 text-red-600" />
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <button
          onClick={handleNextQuestion}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {currentQuestionIndex < courseQuestions.length - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}