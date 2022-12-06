import { List, Typography } from "antd";

const { Text } = Typography;

export const MainScreen = () => {
  const data = [
    "React, TypeScript",
    "Redux, react-redux, redux-thunk",
    "Ant Design",
    "Axios",
    "uuid (for generate unique ids)",
    "SCSS"
  ];
  return (
    <>
      <div>
        <div>
          <List
            size="large"
            header={<div>I use:</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
        <Text keyboard style={{display: 'block', width: '60%', margin: '30px auto 0 auto'}}>
          To maintain a completely identical data structure for both old and new
          users, it was necessary to fill in the lat and lng fields. I had to
          use a library that provides geodata for the city specified by the
          user.
        </Text>
        <div></div>
      </div>
    </>
  );
};
