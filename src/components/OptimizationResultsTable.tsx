import React, { useEffect, useState } from 'react';
import optimizationResults from './optimizationResults.json'; // Import your JSON file
import hljs from 'highlight.js'; // Import Highlight.js
import 'highlight.js/styles/github.css'; // Import a theme for styling

interface Suggestion {
  file: string;
  suggestions: string; // This will contain the suggestions text
  MR_hash: string;
  status: string;
  summary: string;
  description: string;
}

const OptimizationResultsTable = () => {
  const [results, setResults] = useState<Suggestion[] | null>(null);

  useEffect(() => {
    // Directly use the imported JSON data
    setResults(optimizationResults);
  }, []);

  const handleHighlight = (element: HTMLElement) => {
    hljs.highlightElement(element);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Optimization Suggestions
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">File</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Summary</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">MR Hash</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {results ? (
        results.length === 0 ? (
          <p>No optimization results found.</p>
        ) : (
          results.map((result) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={result.MR_hash}
            >
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-black dark:text-white">{result.file}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{result.summary}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{result.MR_hash}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{result.status}</p>
              </div>

              {/* Add a button or trigger to toggle suggestions */}
              <div className="col-span-6 mt-2">
                <button 
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                  onClick={() => {
                    const suggestionsElement = document.getElementById(`suggestions-${result.MR_hash}`);
                    if (suggestionsElement) {
                      suggestionsElement.classList.toggle('hidden');
                      handleHighlight(suggestionsElement.querySelector('code')!);
                    }
                  }}
                >
                  Toggle Suggestions
                </button>
                <pre 
                  id={`suggestions-${result.MR_hash}`} 
                  className="hidden mt-2 p-4 bg-gray-900 border border-gray-700 rounded text-sm text-white overflow-auto"
                >
                  <code>
                    {result.suggestions}
                  </code>
                </pre>
              </div>
            </div>
          ))
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OptimizationResultsTable;
