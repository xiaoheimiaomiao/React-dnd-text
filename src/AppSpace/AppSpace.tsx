import React from "react";
import "./AppSpace.css";
import Space from "./Space/index";
import { ConfigContext } from "./Space/ConfigProvider";
import { ConfigProvider } from "./Space/ConfigProvider";
// import { Space } from "antd";

// direction:设置子组件的方向，水平或竖直
// size：水平，竖直间距
// align：子组件对其方式
// wrap：超过一屏是否换行，只有水平时候有用
// split：分割线
// ConfigProvider：多个Space组件的size，统一设置默认值
export default function App() {
  return (
    <ConfigProvider space={{ size: 20 }}>
      <div>
        <Space direction="horizontal">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </Space>
        <Space direction="vertical">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </Space>
      </div>
    </ConfigProvider>
  );
}
