import './style.css';

import React from 'react';

import type { PlanData } from './@types/flip-card';

const FlipCard = (params: PlanData) => (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <h3>Paisa day</h3>
          <h6>Paisa bta</h6>
        </div>
        <div className="card-back">
          <p>Back Side</p>
        </div>
      </div>
    </div>
  );

export default FlipCard;
