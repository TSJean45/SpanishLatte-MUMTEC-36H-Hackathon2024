import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OptimizationResultsTable = () => {
  const [results, setResults] = useState<{ suggestions: string } | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/optimization-results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching optimization results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Optimization Suggestions</h2>
      {results ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Suggestions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{results.suggestions}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OptimizationResultsTable;
