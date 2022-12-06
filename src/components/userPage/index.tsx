import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Spin } from "antd";
import { IUser } from "../../store/fetchTypes";
import { usersSelector } from "../../store/usersReducer";

const getPrevId = (users: IUser[], user: IUser) => {
  if (users.length === 1) return null;
  const index = users.indexOf(user);
  if (index !== -1) return users[index - 1]?.id || null;
  return null;
};

const getNextId = (users: IUser[], user: IUser) => {
  if (users.length === 1) return null;
  const index = users.indexOf(user);
  if (index !== -1) return users[index + 1]?.id || null;
  return null;
};

const getIds = (users: IUser[], user: IUser) => () => {
  return {
    getPrevId: getPrevId(users, user),
    getNextId: getNextId(users, user),
  };
};

export const User = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const users = useSelector(usersSelector);

  const user = users.find((user) => user.id === id);

  const redirect = () => {
    setTimeout(() => {
      navigate(`/users`);
    }, 2000);
  };
  if (!user) {
    return (
      <>
        <div style={{ marginBottom: "30px" }}>Not found</div>
        <div>
          <Spin size="large" /> <b>Redirect...</b>
        </div>
        {redirect()}
      </>
    );
  }

  const navigationIds = getIds(users, user);

  return (
    <div>
      <div>
        <Button
          disabled={!navigationIds().getPrevId}
          onClick={() => navigate(`/users/${navigationIds().getPrevId}`)}
        >
          Prev user
        </Button>
        <Button
          disabled={!navigationIds().getNextId}
          onClick={() => navigate(`/users/${navigationIds().getNextId}`)}
        >
          Next user
        </Button>
      </div>
      <div>
        <b>name -</b> {user.name}
      </div>
      <div>
        <b>username -</b> {user.username}
      </div>
      <div>
        <b>name -</b> {user.email}
      </div>
      <div>
        <b>phone -</b> {user.phone}
      </div>

      <div>
        <b>city -</b> {user.address.city}
      </div>

      <div>
        <b>zipcode -</b> {user.address.zipcode}
      </div>

      <div>
        <b>geo (lng) -</b> {user.address.geo.lng} <b>geo (lat) -</b>{" "}
        {user.address.geo.lat}
      </div>
      <div>
        <b>website -</b> {user.website}
      </div>
      <div>
        <b>company name -</b> {user.company.name}
      </div>
      <div>
        <b>catch phrase -</b> {user.company.catchPhrase}
      </div>
      <div>
        <b>bs -</b> {user.company.bs}
      </div>
    </div>
  );
};
