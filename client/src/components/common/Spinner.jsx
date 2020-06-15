import React from 'react';

const Spinner = (props) => {
  // By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
  return (
    <div style={{...style, ...props.style}}>
      <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#000">
        <g fill="none" fillRule="evenodd" strokeWidth="2">
          <circle cx="22" cy="22" r="1">
            <animate attributeName="r"
              begin="0s" dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
              begin="0s" dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="1">
            <animate attributeName="r"
              begin="-0.9s" dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
              begin="-0.9s" dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

const style = {
  margin: '0 auto',
  width: '100px',
  height: '100px',
};

export default Spinner;
