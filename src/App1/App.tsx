import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <Container></Container>
      <Box color="bule"></Box>
      <Box color="red"></Box>
      <Box color="yellow"></Box>
      <DragLayer></DragLayer>
    </div>
  );
}

type BoxProps = {
  color: string;
};

type ItemType = {
  color: string;
  // id: number;
};

function Box(props: BoxProps) {
  const ref = useRef(null);
  //第三个函数用来处理预览元素，我们用getEmptyImage 替换它，这样就看不到了
  const [{ dragging }, drag, dragPreview] = useDrag({
    type: "box",
    item: {
      color: props.color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      className={dragging ? "box dragging" : "box"}
      ref={ref}
      style={{ backgroundColor: props.color || "bule" }}
    ></div>
  );
}

function Container() {
  const [boxes, setBoxes] = useState<ItemType[]>([]);

  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: "box",
      drop(item: ItemType) {
        setBoxes((boxes) => [...boxes, item]);
        console.log("boxes: ", boxes);
      },
    };
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div className="container" ref={ref}>
      {boxes.map((item) => {
        return <Box key={item.color} color={item.color}></Box>;
      })}
    </div>
  );
}

const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="drag-layer"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}
    >
      {item.color} 拖拖拖9
    </div>
  );
};
export default App;
