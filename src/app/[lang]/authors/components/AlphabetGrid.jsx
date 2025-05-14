import React, { useMemo } from  'react';

const AlphabetGrid = ({ authors, onClick, selectedLetter }) => {

    const alphabet = useMemo(() => {
        /*const letters = new Set();
        authors?.forEach(author => {
            const firstLetter = author.key.trim().charAt(0).toUpperCase();
            letters.add(firstLetter);
        });
        return Array.from(letters).sort();*/

        const items = 'آابپتثجچحخدذرزژسشصضطظعغفقكلمنوهی'.split('');
        items.push('همه');
        return items;
    }, [authors]);
    selectedLetter = selectedLetter || 'همه';
    return (
        <div className="grid grid-cols-6 gap-2 justify-around p-4 rounded-lg">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    className={`text-normal w-8 h-8 text-white rounded ${selectedLetter == letter ? 'bg-amber-500': 'bg-teal-600 hover:bg-teal-400'} `}
                    onClick={() => onClick?.(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}

export default AlphabetGrid;