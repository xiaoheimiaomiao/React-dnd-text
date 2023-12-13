import React from "react";
import "./App5.css";
import { Button, Space } from "antd";
import Space1 from "./Space1";

export default function App() {
  return (
    <div>
      <Space
        direction="horizontal"
        size="middle"
        align="baseline"
        // split={<div className="box" style={{ backgroundColor: "red" }}></div>}
        className="pp"
      >
        {/* {[1, 2]} */}
        baseline
        <Button type="primary">Primary</Button>
        <span className="mock-block">Block</span>
      </Space>
    </div>
  );
}
