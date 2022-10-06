import React, { FC } from "react";
import { HelloWorldProps } from './dto/hello-world.prop.dto'

const HelloWorld: FC<HelloWorldProps> = ({ message }) => {
  return (
    <>
      <h1>Hello World</h1>
      <h2>this is the message from author {message}</h2>
    </>
  )
}

export default HelloWorld