import { useContext, useState } from 'react';
import { DetailsContext } from './DetailsContext';

const HangingMan = () => {
  const {
    displayWord,
    currentLife,
    submitLetter,
  } = useContext(DetailsContext);

  const [inputLetter, setInputLetter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputLetter.trim() !== '') {
      submitLetter(inputLetter.trim().toUpperCase());
      setInputLetter(''); // Clear the input field by resetting state
    }
  };

  return (
    <div className="hangingManContainer">
      <h2>Hanging Man</h2>
      <div className="wordDisplay">
        {displayWord.map((char, index) => (
          <span key={index} className="letterSlot">
            {char}
          </span>
        ))}
      </div>
      <p>Lives Remaining: {currentLife}</p>
      <form onSubmit={handleSubmit} className="letterForm">
        <input
          type="text"
          maxLength="1"
          value={inputLetter} // Ensure the input value is controlled by state
          onChange={(e) => setInputLetter(e.target.value)}
          placeholder="Enter a letter"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HangingMan;