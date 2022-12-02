import { useState } from "react";
import { parse } from "@babel/parser";
import babelPluginVisitor from "../src/babel/visitor";
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;

export default function Home() {
  const [code, setCode] = useState(`
  import React from 'react';
  import { render } from 'react-dom';
  import {AbcComp} from 'AbcComp';
  
  const App = () =>{
    const a = 1;
    return (
      <div>
        <h1>Hello World</h1>
        <AbcComp
          prop1={{
            prop1: 'prop1',
            prop2: 'prop2',
            prop3: 'prop3',
          }}
          var={a}
        />
      </div>
    );
  }
  `);
  const [output, setOutput] = useState("");

  const transpileCode = (code: string) => {
    const ast = parse(code, {
      errorRecovery: true,
      plugins: ["jsx"],
      sourceType: "module",
    });

    traverse(ast, {
      ...babelPluginVisitor,
    });
    const output = generate(ast, code);
    // console.log(output);

    setOutput(output.code);
  };
  return (
    <div style={{ paddingLeft: 10, height: "100vh" }}>
      <h2>Babel Playground</h2>
      <div style={{ flexDirection: "row", display: "flex", height: "80%" }}>
        {/* <div style={{ flex: 1, height: 600 }}>
          <div>Option 1</div>
          <div>Option 1</div>
          <div>Option 1</div>
        </div> */}
        <div
          style={{
            flex: 5,
            backgroundColor: "#4d4d4d",
            padding: 8,
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", height: "94%" }}>
            <textarea
              style={{ flex: 1 }}
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
            <div style={{ padding: "4px" }}></div>
            <textarea style={{ flex: 1 }} onChange={() => {}} value={output} />
          </div>
          <button
            style={{
              width: "100%",
              height: "6%",
              backgroundColor: "#aae8dc",
              color: "#4a5567",
              border: "none",
              borderRadius: 5,
              marginTop: 4,
            }}
            onClick={() => transpileCode(code)}
          >
            Transpile Code
          </button>
        </div>
      </div>
    </div>
  );
}
