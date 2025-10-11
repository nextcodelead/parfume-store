import React from "react";

interface Notes {
  top: string[];
  heart: string[];
  base: string[];
}

const FragranceNotes: React.FC<{ notes: Notes }> = ({ notes }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ноты аромата</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-2xl">☀️</span> Верхние ноты
          </h3>
          <div className="flex flex-wrap gap-2">
            {notes.top.map((note, idx) => (
              <span
                key={idx}
                className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-2xl">💐</span> Средние ноты
          </h3>
          <div className="flex flex-wrap gap-2">
            {notes.heart.map((note, idx) => (
              <span
                key={idx}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span className="text-2xl">🌲</span> Базовые ноты
          </h3>
          <div className="flex flex-wrap gap-2">
            {notes.base.map((note, idx) => (
              <span
                key={idx}
                className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceNotes;
