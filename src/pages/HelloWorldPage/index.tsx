import React, { FC, useContext } from 'react';
import { colorContext as ColorContext } from '../../utils/contexts/app-contexts'
export interface HelloWorldProps {
  message?: string;
}

const HelloWorld: FC<HelloWorldProps> = ({ message }) => {
  const thisis = useContext(ColorContext);
  console.log("in the hello world: ", {thisis})
  return (
    <>
      <h1>Hello World</h1>
      <h2>this is the message from author {message}</h2>
    </>
  );
};

export default HelloWorld;
