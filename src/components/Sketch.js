import React from 'react';
import Sketch from 'react-p5';

const style = { display: 'flex', width: '100%', height: 'auto' };

export default function Rain() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(150, 100).parent(canvasParentRef).style('width', '100%');
  };
}
