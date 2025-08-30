import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DetailsContext } from './DetailsContext';
import Colors from './Colors';
import ResultForm from './ResultForm';
import Recipe from './Recipe';
import Counter from './Counter';


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

  // Provide the context values
  const contextValue = {
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
      </div>
    </DetailsContext.Provider>
  );
};

export default Details;