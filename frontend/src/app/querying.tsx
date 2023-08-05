// querying.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./globals.css";
interface QueryInputProps {
  onQuerySubmit: (query: string) => void;
}

const QueryInput = ({ onQuerySubmit }: QueryInputProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call the callback function with the query as an argument
    onQuerySubmit(query);
    // Clear the input field after submitting the query
    setQuery("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <input
        className="input-field"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter your query..."
      />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default QueryInput;
