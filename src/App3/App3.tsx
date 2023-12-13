import React, { Fragment, useCallback, useContext, useState } from "react";
import "./App3.css";
import { type } from "os";
import { useDrag, useDrop } from "react-dnd";

const ROW = "row";
const COLUMN = "column";
const COMPONENT = "component";

interface LayoutItem {
  type: string;
  id: string;
  children?: LayoutItem[];
  component?: {
    type: string;
  };
}

const initialLayout = [
  {
    type: ROW,
    id: "row0",
    children: [
      {
        type: COLUMN,
        id: "colum0",
        children: [
          {
            type: COMPONENT,
            id: "component0",
            component: {
              type: "aaa",
            },
          },
          {
            type: COMPONENT,
            id: "component1",
            component: {
              type: "bbb",
            },
          },
        ],
      },
      {
        type: COLUMN,
        id: "colum1",
        children: [
          {
            type: COMPONENT,
            id: "component2",
            component: {
              type: "aaa",
            },
          },
        ],
      },
    ],
  },
  {
    type: ROW,
    id: "row1",
    children: [
      {
        type: COLUMN,
        id: "colum2",
        children: [
          {
            type: COMPONENT,
            id: "component3",
            component: {
              type: "bbb",
            },
          },
          {
            type: COMPONENT,
            id: "component0",
            component: {
              type: "aaa",
            },
          },
          {
            type: COMPONENT,
            id: "component2",
            component: {
              type: "bbb",
            },
          },
        ],
      },
    ],
  },
];
interface ComponentProps {
  data: LayoutItem;
  columnIndex: number;
  rowIndex: number;
  compIndex: number;
}
const Component = (componentProps: ComponentProps) => {
  const { component } = componentProps.data;

  const currentPath = `${componentProps.rowIndex}-${componentProps.columnIndex}-${componentProps.compIndex}`;
  const [, drag] = useDrag({
    type: "component",
    item: {
      type: "component",
      path: currentPath,
      data: componentProps.data,
    },
  });
  const Comp = registeredComponent[component!.type];
  return (
    <div className="component" ref={drag}>
      {<Comp></Comp>}
    </div>
  );
};
interface ColumnProps {
  data: LayoutItem;
  columnIndex: number;
  rowIndex: number;
}
const Column = (columnProps: ColumnProps) => {
  const { children } = columnProps.data;

  const currentPath = `${columnProps.rowIndex}-${columnProps.columnIndex}`;
  const [, drag] = useDrag({
    type: "column",
    item: {
      type: "column",
      path: currentPath,
      data: columnProps.data,
    },
  });
  return (
    <div className="column" ref={drag}>
      {children?.map((item, index) => {
        return (
          <Fragment>
            <DropZone
              className="drop-zone-horizentai"
              path={`${currentPath}-${index}`}
            ></DropZone>
            <Component
              rowIndex={columnProps.rowIndex}
              columnIndex={columnProps.columnIndex}
              compIndex={index}
              data={item}
              key={`comp_id_${item.id}`}
            ></Component>
          </Fragment>
        );
      })}
      <DropZone
        className="drop-zone-horizentai"
        path={`${currentPath}-${children?.length}`}
      ></DropZone>
    </div>
  );
};

interface RowProps {
  data: LayoutItem;
  rowIndex: number;
}

const Row = (rowProps: RowProps) => {
  const { children } = rowProps.data;

  const currentPath = rowProps.rowIndex + "";
  const [, drag] = useDrag({
    type: "row",
    item: {
      path: currentPath,
      type: "row",
      data: rowProps.data,
    },
  });
  return (
    <div ref={drag} className="row">
      {children?.map((item, index) => {
        return (
          <Fragment>
            <DropZone
              className="drop-zone-vertical"
              path={`${currentPath}-${index}`}
            ></DropZone>
            <Column
              rowIndex={rowProps.rowIndex}
              columnIndex={index}
              data={item}
              key={`column_id_${item.id}`}
            ></Column>
            ;
          </Fragment>
        );
      })}
      <DropZone
        className="drop-zone-vertical"
        path={`${currentPath}-${children?.length}`}
      ></DropZone>
    </div>
  );
};
const Aa = () => {
  return <button>aaa</button>;
};
const Bb = () => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        backgroundColor: "red",
      }}
    >
      bbb
    </div>
  );
};

const Cc = () => {
  return <input type="range"></input>;
};

const registeredComponent: Record<string, any> = {
  aaa: Aa,
  bbb: Bb,
  ccc: Cc,
};

// 候选组件区
interface BarItemProps {
  type: string;
}

const BarItem = (props: BarItemProps) => {
  const Comp = registeredComponent[props.type];
  const [, drag] = useDrag({
    type: "barItem",
    item: props,
  });
  return (
    <div className="bar-item" ref={drag}>
      <Comp></Comp>
    </div>
  );
};

// 空白区域
interface DropZoneProps {
  className: string;
  path: string;
}
const DropZone = (props: DropZoneProps) => {
  const { swapPosition } = useContext(LayoutContext);

  const [{ overing }, drop] = useDrop({
    accept: ["column", "row", "component", "barItem"],
    drop(item: any) {
      swapPosition(item, props.path);
      // console.log(item.path, props.path);
    },
    collect(monitor) {
      return {
        overing: monitor.isOver(),
      };
    },
  });
  return (
    <div
      ref={drop}
      className={`drop-zone ${props.className} ${overing ? "focus" : ""}`}
    ></div>
  );
};
type ContextType = { swapPosition: Function };
const LayoutContext = React.createContext<ContextType>({
  swapPosition: () => {},
});
export default function App() {
  const [layout, setLayout] = useState<LayoutItem[]>(initialLayout);
  const swapPosition = useCallback((item: any, path2: string) => {
    const lay = layout as any;
    lay[1].children[0].children.splice(0, 1);
    lay[0].children[1].children.splice(1, 0, item.data);
    // console.log(item.path1, path2);
    setLayout([...lay]);
  }, []);
  return (
    <LayoutContext.Provider value={{ swapPosition }}>
      <div className="container">
        {layout.map((item, index) => (
          <Fragment>
            <DropZone
              path={index + ""}
              className="drop-zone-horizentai"
            ></DropZone>
            <Row data={item} rowIndex={index} key={`row_id_${item.id}`}></Row>
          </Fragment>
        ))}
        <DropZone
          className="drop-zone-horizentai"
          path={`${layout.length}`}
        ></DropZone>
        <div className="bottomBar">
          <BarItem type="aaa"></BarItem>
          <BarItem type="bbb"></BarItem>
          <BarItem type="ccc"></BarItem>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
