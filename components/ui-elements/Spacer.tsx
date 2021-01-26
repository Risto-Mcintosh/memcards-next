import * as React from 'react';
type props = {
  size: number;
  axis?: 'vertical' | 'horizontal';
} & React.HTMLAttributes<HTMLSpanElement>;
export const Spacer = ({ size, axis, style = {}, ...delegated }: props) => {
  const width = `${axis === 'vertical' ? 1 : size}px`;
  const height = `${axis === 'horizontal' ? 1 : size}px`;
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style
      }}
      {...delegated}
    />
  );
};
