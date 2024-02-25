import React from "react";
import Game from "./Game";
import { create } from "zustand";
const voting = "https://api.github.com/search/users?q=john&per_page=5";

const useStore = create((set, get) => ({
  // votes: 0,
  // addVotes: () =>
  //   set((state) => ({
  //     votes: state.votes + 1,
  //   })),
  // subtractVotes: () =>
  //   set((state) => ({
  //     votes: state.votes - 1,
  //   })),
  // fetch: async (voting) => {
  //   const response = await fetch(voting);
  //   const json = await response.json();
  //   set({
  //     votes: json.items.length,
  //   });
  // },

  fruits: ["apple", "banana", "orange"],
  addFruits: (fruit) => {
    set((state) => ({
      fruits: [...state.fruits, fruit],
    }));
  },
}));

export default function App7() {
  // const useStore = create((set) => ({
  //   number: 0,
  //   addNumber: () => set((state) => ({ number: state.number + 1 })),
  //   subtractNumber: () => set((state) => ({ number: state.number - 1 })),
  // }));
  // const bears = useBearStore((state) => state.bears);
  // const increasePopulation = useBearStore((state) => state.increasePopulation);
  // const removeAllBears = useBearStore((state) => state.removeAllBears);
  const getVotes = useStore((state) => state.votes);
  const addVotes = useStore((state) => state.addVotes);
  const subtractVotes = useStore((state) => state.subtractVotes);
  const fetch = useStore((state) => state.fetch);

  const fruits = useStore((state) => state.fruits);
  const addFruits = useStore((state) => state.addFruits);
  const inputRef = React.useRef();
  const addFruit = () => {
    addFruits(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1>Number:{getVotes}</h1>
      <button onClick={addVotes}>加</button>
      <button onClick={subtractVotes}>减</button>
      <button
        onClick={() => {
          fetch(voting);
        }}
      >
        Fetch votes
      </button>
      <Game></Game>
      <h1>I have {fruits.length} fruits in my basket</h1>
      <p>Add a new fruit</p>
      <input ref={inputRef} />
      <button onClick={addFruit}>Add a fruit</button>
      {fruits.map((fruit) => (
        <p key={fruit}>{fruit}</p>
      ))}
    </div>
  );
}
