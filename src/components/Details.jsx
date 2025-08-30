import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DetailsContext } from './DetailsContext';
import Colors from './Colors';
import ResultForm from './ResultForm';
import Recipe from './Recipe';
import Counter from './Counter';
import HangingManPopup from './HangingManPopup'; // New component for pop-up

const Details = () => {
  // State for colors
  const colors = ['red', 'green', 'purple', 'blue'];
  const [currentColor, setCurrentColor] = useState('red');

  const handleClick = () => {
    const currentIndex = colors.indexOf(currentColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setCurrentColor(colors[nextIndex]);
  };

  // State for ResultForm
  const [currentText, setCurrentText] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const text = data.Text.toLowerCase().trim();
    setCurrentText(text);
    reset(); // Clear the input field
  };

  // State for Recipe
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const getApi = async () => {
    let mealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(mealUrl);
    const datas = await response.json();
    if (datas.meals && datas.meals.length > 0) {
      const meal = datas.meals[0];
      return {
        title: meal.strMeal,
        poster: meal.strMealThumb,
        url: meal.strSource,
      };
    }
    return {};
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getApi();
      setCurrentRecipe(recipe);
    };
    fetchRecipe();
  }, []);

  const handleClickRecipe = async () => {
    const nextRecipe = await getApi();
    setCurrentRecipe(nextRecipe);
  };

  // State for Hanging Man
  const [currentWord, setCurrentWord] = useState('');
  const [displayWord, setDisplayWord] = useState([]); // Hidden word with dashes
  const [currentLetter, setCurrentLetter] = useState('');
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [currentLife, setCurrentLife] = useState(6);
  const [goodAnswers, setGoodAnswers] = useState([]);
  const [badAnswers, setBadAnswers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const inputRef = useRef(null); // Reference for the input field

  const getWord = async () => {
    let wordUrl = 'https://random-word-api.herokuapp.com/word?number=1';
    const response = await fetch(wordUrl);
    const randomWordArr = await response.json();
    const word = randomWordArr[0].toUpperCase();
    const letters = word.split('');
    const uniqueLetters = [...new Set(letters)];
    setCurrentWord(word);
    setDisplayWord(Array(word.length).fill('_'));
    setUniqueLetters(uniqueLetters);
  };

  useEffect(() => {
    getWord();
  }, []);

  const submitLetter = (letter) => {
    if (currentLife <= 0 || goodAnswers.length === uniqueLetters.length) {
      return;
    }

    letter = letter.toUpperCase();

    if (goodAnswers.includes(letter) || badAnswers.includes(letter)) {
  
      return; // Letter already guessed
    }

    if (currentWord.includes(letter)) {
      const updatedDisplayWord = displayWord.map((char, index) =>
        currentWord[index] === letter ? letter : char
      );
      setDisplayWord(updatedDisplayWord);
      setGoodAnswers([...goodAnswers, letter]);

      if (uniqueLetters.length === goodAnswers.length + 1) {
        setPopupMessage('Congratulations! You won! 🏆');
        setShowPopup(true);
      }
    } else {
      setBadAnswers([...badAnswers, letter]);
      setCurrentLife(currentLife - 1);

      if (currentLife - 1 === 0) {
        setPopupMessage(`Game Over! The word was: ${currentWord}`);
        setShowPopup(true);
      }
    }

    setCurrentLetter(''); // Clear the input field
    if (inputRef.current) {
      inputRef.current.focus(); // Refocus the input field
    }
  };

  const replayGame = () => {
    setCurrentLife(6);
    setGoodAnswers([]);
    setBadAnswers([]);
    setShowPopup(false);
    getWord();
  };

  // Provide the context values
  const contextValue = {
    currentWord,
    displayWord,
    currentLife,
    submitLetter,
    replayGame,
    currentColor,
    handleClick,
    currentText,
    setCurrentText,
    register,
    handleSubmit,
    onSubmit,
    currentRecipe,
    handleClickRecipe,
  };

  return (
    <DetailsContext.Provider value={contextValue}>
      <div className="detailsDiv">
        <div className="counterDiv">
          <Counter />
        </div>
        <div className="colorDiv">
          <Colors />
          <button onClick={handleClick}>Change Color</button>
        </div>
        <div className="formTextDiv">
          <ResultForm />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('Text')} className="textInput" />
            <input type="submit" />
          </form>
        </div>
        <div className="recipeDiv">
          {currentRecipe && <Recipe />}
          <button onClick={handleClickRecipe}>Change Recipe</button>
        </div>
        <div className="hangingManDiv">
          <h2>Hanging Man</h2>
          <p>{displayWord.join(' ')}</p>
          <p>Lives: {currentLife}</p>
          <input
            ref={inputRef} // Attach the reference
            type="text"
            maxLength="1"
            value={currentLetter}
            onChange={(e) => setCurrentLetter(e.target.value)}
          />
          <button onClick={() => submitLetter(currentLetter)}>Submit</button>
        </div>
        {showPopup && (
          <HangingManPopup message={popupMessage} onReplay={replayGame} />
        )}
      </div>
    </DetailsContext.Provider>
  );
};

export default Details;