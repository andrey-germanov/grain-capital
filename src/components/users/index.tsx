import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { usersSelector } from "../../store/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/asyncActions/users";
import { RemoveUser } from "../modals/removeUser";
import { CreateUser } from "../modals/createUser";
import { IUser } from "../../store/fetchTypes";
import { EditUser } from "../modals/editUser";

export const Users = () => {
  const users = useSelector(usersSelector);
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState<IUser[]>(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  useEffect(() => {
    setUsersData(users);
  }, [users]);

  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (record.edited ? <i>{id}</i> : <span>{id}</span>),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) =>
        record.edited ? (
          <i>
            <Link to={`/users/${record.id}`}>{name}</Link>
          </i>
        ) : (
          <Link to={`/users/${record.id}`}>{name}</Link>
        ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username, record) =>
        record.edited ? <i>{username}</i> : <span>{username}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => showModal(record.id)}>
              Edit
            </Button>
            <RemoveUser id={record.id} name={record.name} />
          </Space>
        );
      },
    },
  ];

  const showModal = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };
  const handlerChange = (e: any) => {
    const searchData = users.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsersData(searchData);
  };
  return (
    <div>
      {isModalOpen && (
        <EditUser id={selectedUserId} setIsModalOpen={setIsModalOpen} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", padding: '12px'}}>
        <Button onClick={() => dispatch(fetchUsers())}>
          get users from api
        </Button>
        <Input
          style={{ width: "150px" }}
          onChange={handlerChange}
          type="text"
        />
        <CreateUser />
      </div>
      <Table columns={columns} dataSource={usersData} />
    </div>
  );
};
