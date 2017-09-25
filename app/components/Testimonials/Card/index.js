// @flow

import React, { Component } from 'react';

import './styles.scss';

type Props = {
  data: object,
};

const TestimonialCard = ({ data }: Props) => {
  return (
    <div className="testimonialCard">
      <div className="row column np">
        <p className="testimonialCard__desc">{data.content}</p>
      </div>
      <div className="row align-middle">
        <div className="shrink column np">
          <img
            className="testimonialCard__avatar"
            src={data.avatar}
            alt={data.username}
          />
        </div>
        <div className="column">
          <p className="testimonialCard__username">{data.username}</p>
          <p className="testimonialCard__company">{data.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
