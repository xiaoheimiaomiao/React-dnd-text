import React, { useEffect } from "react";
import { useSpringValue, animated, useSpring } from "@react-spring/web";
import "./App9.css";
export default function App() {
  // const width = useSpringValue(0, {
  //   config: {
  //     // duration: 2000,
  //     // 质量越大，弹簧回弹距离和次数越多
  //     mass: 3,
  //     // 张力，弹簧松紧度
  //     tension: 200,
  //     // 摩擦力，增加阻力可以抵消质量和张力的效果
  //     friction: 10,
  //   },
  // });

  // const style = useSpring({
  //   from: {
  //     width: 0,
  //     height: 0,
  //   },
  //   to: {
  //     width: 200,
  //     height: 200,
  //   },
  //   config: {
  //     // duration: 2000,
  //     mass: 2,
  //     friction: 10,
  //     tension: 400,
  //   },
  // });

  // useEffect(() => {
  //   width.start(300);
  // }, []);

  const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100,
      },
      config: {
        mass: 2,
        friction: 10,
        tension: 400,
      },
    };
  });

  function clickHandler() {
    api.start({
      width: 200,
      height: 200,
    });
  }
  return (
    <animated.div
      className="box"
      style={{ ...styles }}
      onClick={clickHandler}
    ></animated.div>
  );
}
