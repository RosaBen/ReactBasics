import { useContext } from 'react';
import { DetailsContext } from './DetailsContext';

const Recipe = () => {
  const { currentRecipe } = useContext(DetailsContext);

  if (!currentRecipe) return null;

  return (
    <div className="myRecipe">
      <a href={currentRecipe.url}>
        <h3>{currentRecipe.title}</h3>
      </a>
      <img src={currentRecipe.poster} alt={currentRecipe.title} />
    </div>
  );
};

export default Recipe;