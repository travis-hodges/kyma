import React from 'react';
import NeuralNetwork from './NeuralNetwork';

const MarketBackground = () => {
  return (
    <NeuralNetwork 
      intensity="high"
      color="orange"
      connectionDistance={280}
      baseOpacity={0.6}
    />
  );
};

export default MarketBackground; 