import React, { FC } from 'react';

export interface TitleProps {
  title?: string;
}

const Title: FC = (props: TitleProps) => {
  return <h2>{props.title}</h2>;
};

export default Title;
