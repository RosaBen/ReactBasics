import { useContext } from 'react';
import { DetailsContext } from './DetailsContext';

const Colors = () => {
  const { currentColor } = useContext(DetailsContext);

  return <div style={{ backgroundColor: currentColor }}>Current Color: {currentColor}</div>;
};

export default Colors;