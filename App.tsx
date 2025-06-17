
import React, { useState, useCallback } from 'react';
import { Mode, Difficulty } from './types';
import { WORD_LISTS, PITCH_BATTLE_THEMES } from './constants';
import Card from './components/Card';
import ModeSelector from './components/ModeSelector';
import DifficultySelector from './components/DifficultySelector';
import IdeaDisplay from './components/IdeaDisplay';

const getRandomUniqueElements = <T,>(arr: T[], count: number): T[] => {
  if (arr.length === 0) return [];
  const actualCount = Math.min(count, arr.length);
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, actualCount);
};

const getRandomElement = <T,>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
};

const App: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<Mode>(Mode.ThreeWordBusiness);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [generatedIdea, setGeneratedIdea] = useState<string | null>(null);

  const handleGenerateIdea = useCallback(() => {
    if (selectedMode === Mode.ThreeWordBusiness) {
      const wordList = WORD_LISTS[selectedDifficulty];
      const words = getRandomUniqueElements(wordList, 3);
      if (words.length > 0) {
        setGeneratedIdea(`単語1：${words[0]}, 単語2：${words[1] || 'N/A'}, 単語3：${words[2] || 'N/A'}`);
      } else {
        setGeneratedIdea("単語リストから単語を生成できませんでした。");
      }
    } else if (selectedMode === Mode.PitchBattle) {
      const theme = getRandomElement(PITCH_BATTLE_THEMES);
      if (theme) {
        setGeneratedIdea(`お題：${theme}`);
      } else {
        setGeneratedIdea("テーマリストからテーマを生成できませんでした。");
      }
    }
  }, [selectedMode, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 flex flex-col items-center justify-center p-4 selection:bg-yellow-400 selection:text-purple-900">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Startup Idea Generator
          </h1>
          <p className="mt-3 text-lg text-purple-200">起業アイデア自動生成ツール</p>
        </header>

        <main className="space-y-6">
          <Card title="1. モード選択" className="bg-white/90 backdrop-blur-sm">
            <ModeSelector selectedMode={selectedMode} onModeChange={setSelectedMode} />
          </Card>

          {selectedMode === Mode.ThreeWordBusiness && (
            <Card title="2. 追加オプション（3ワードビジネス選択時）" className="bg-white/90 backdrop-blur-sm">
              <DifficultySelector selectedDifficulty={selectedDifficulty} onDifficultyChange={setSelectedDifficulty} />
            </Card>
          )}

          <button
            onClick={handleGenerateIdea}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-4 px-6 rounded-lg text-xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out flex items-center justify-center space-x-3 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75"
          >
            <span role="img" aria-label="dice" className="text-2xl">🎲</span>
            <span>お題を生成する</span>
          </button>

          {generatedIdea && (
             <Card title="✨ 生成されたアイデア ✨" 
                   className="bg-purple-800/90 backdrop-blur-sm border border-purple-600"
                   titleClassName="text-yellow-400">
              <IdeaDisplay idea={generatedIdea} />
            </Card>
          )}
        </main>

        <footer className="text-center text-purple-300 text-sm mt-10">
          <p>&copy; {new Date().getFullYear()} Startup Idea Generator. Spark your creativity!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
