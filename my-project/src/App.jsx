import React, { useState } from "react";

const App = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const buttons = [
    { label: "C", type: "action" },
    { label: "+/-", type: "action" },
    { label: "%", type: "action" },
    { label: "/", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "*", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "0", type: "number", span: 2 },
    { label: ".", type: "number" },
    { label: "=", type: "equals" },
  ];

  const handleInput = (value) => {
    if (result !== null) {
      setCurrentInput("");
      setResult(null);
    }
    setCurrentInput((prev) => prev + value);
  };

  const handleClear = () => {
    setCurrentInput("");
    setResult(null);
    setHistory([]);
  };

  const calculate = () => {
    try {
      const evalResult = eval(currentInput); 
      setHistory((prev) => [
        ...prev,
        { operation: currentInput, result: evalResult },
      ]);
      setResult(evalResult);
      setCurrentInput(String(evalResult));
    } catch {
      setResult("Error");
    }
  };

  const handleAction = (label) => {
    if (label === "C") handleClear();
    else if (label === "+/-") {
      setCurrentInput((prev) => (prev ? String(-1 * parseFloat(prev)) : ""));
    } else if (label === "%") {
      setCurrentInput((prev) => (prev ? String(parseFloat(prev) / 100) : ""));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-80 mb-4">
   
        <div className="text-right text-4xl font-light p-4 mb-4 bg-gray-700 rounded-md">
          {result !== null ? result : currentInput || "0"}
        </div>


        <div className="grid grid-cols-4 gap-2">
          {buttons.map(({ label, type, span }) => (
            <button
              key={label}
              className={`p-4 text-xl font-semibold rounded-md ${
                type === "number"
                  ? "bg-gray-600 hover:bg-gray-500"
                  : type === "operator"
                  ? "bg-orange-500 hover:bg-orange-400 text-white"
                  : type === "equals"
                  ? "bg-green-500 hover:bg-green-400 text-white"
                  : "bg-gray-500 hover:bg-gray-400"
              } ${span ? `col-span-${span}` : ""}`}
              onClick={() =>
                type === "action"
                  ? handleAction(label)
                  : type === "equals"
                  ? calculate()
                  : handleInput(label)
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

    
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 w-80">
        <h2 className="text-lg font-semibold mb-2">History</h2>
        <div className="max-h-40 overflow-y-auto">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between py-1 border-b border-gray-700"
              >
                <span className="text-gray-400">{entry.operation}</span>
                <span className="text-white">{entry.result}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No history yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
