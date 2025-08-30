import { useContext } from 'react';
import { DetailsContext } from './DetailsContext';

const ResultForm = () => {
  const { currentText } = useContext(DetailsContext);

  return <div>Result: {currentText}</div>;
};

export default ResultForm;