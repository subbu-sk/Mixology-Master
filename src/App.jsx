import React from 'react';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import MoodSelection from './components/MoodSelection';
import TastePreference from './components/TastePreference';
import IngredientSelection from './components/IngredientSelection';
import MixingStation from './components/MixingStation';
import CocktailResult from './components/CocktailResult';

function App() {
  const step = useSelector((state) => state.cocktail.step);

  const renderStep = () => {
    switch (step) {
      case 'mood':
        return <MoodSelection />;
      case 'taste':
        return <TastePreference />;
      case 'ingredients':
        return <IngredientSelection />;
      case 'mixing':
        return <MixingStation />;
      case 'result':
        return <CocktailResult />;
      default:
        return <MoodSelection />;
    }
  };

  return (
    <Layout>
      {renderStep()}
    </Layout>
  );
}

export default App;
