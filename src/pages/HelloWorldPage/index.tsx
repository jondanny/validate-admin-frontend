import React, { FC } from 'react';
export interface HelloWorldProps {
  message?: string;
}

const HelloWorld: FC<HelloWorldProps> = ({ message }) => {
  return (
    <>
      <h1>Hello World</h1>
      <h2>this is the message from author {message}</h2>
    </>
  );
};

export default HelloWorld;
