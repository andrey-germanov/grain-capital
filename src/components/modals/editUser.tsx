import { Alert, Button, Form, Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./UserModal.module.scss";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { IUser } from "../../store/fetchTypes";
import axios from "axios";
import {
  clearInfoUserAction,
  getUserAction,
  updateUserAction,
  userSelector,
} from "../../store/usersReducer";
import { CheckOutlined } from "@ant-design/icons";

type CoordsCity = {
  lng: number;
  lat: number;
};
type Props = {
  id: string;
  setIsModalOpen: (show: boolean) => void;
};
export const EditUser = ({ id, setIsModalOpen }: Props) => {
  const dispatch = useDispatch();
  const [lngLat, setLngLat] = useState<CoordsCity | null>(null);
  const [incorrectCity, setIncorrectCity] = useState<string>("");
  const [form] = Form.useForm();
  const user = useSelector(userSelector);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserAction(id));
  }, [user]);

  const getLonLat = async (city: string) => {
    setLoading(true);
    await axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=45769c445c35568a9e68d277b3848b54`
      )
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        if (!data[0]) return setIncorrectCity(city);
        setIncorrectCity("");
        const { lon, lat } = data[0];
        setLngLat({ lng: lon, lat });
      });
  };

  if (!user) return <></>;

  const onFinish = async (values: any) => {
    getLonLat(values.city);

    if (!lngLat) return;

    const editedData: IUser = {
      id,
      name: values.name,
      username: values.username,
      email: values.email,
      address: {
        city: values.city,
        street: values.street,
        suite: values.suite,
        zipcode: values.zipcode,
        geo: {
          lat: lngLat.lat.toString(),
          lng: lngLat.lng.toString(),
        },
      },
      phone: values.phone,
      website: values.website,
      company: {
        name: values.nameCompany,
        bs: values.bs,
        catchPhrase: values.catchPhrase,
      },
      edited: true,
    };

    dispatch(updateUserAction(editedData));
    form.resetFields();
    dispatch(clearInfoUserAction());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearInfoUserAction());
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<IUser>) => {
    console.log(errorInfo);
  };

  const data = {
    ...user,
    ...user?.address,
    nameCompany: user.company.name,
    bs: user.company.bs,
    catchPhrase: user.company.catchPhrase,
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        title="Basic Modal"
        open={true}
        className={s.addClientModal}
        footer={null}
        onCancel={handleCancel}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "2342342",
            top: "10px",
            left: "0px",
            width: "100%",
            background: "transparent",
          }}
        >
          {incorrectCity && (
            <Alert
              style={{ width: "50%", margin: "0 auto", textAlign: "center" }}
              message={`incorrectcity ${incorrectCity}`}
              type="error"
            />
          )}
        </div>
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={data}
        >
          <Form.Item
            className={s.name}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            className={s.userName}
            name="username"
            label="User name"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="User name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <h3>Address</h3>
          <Form.Item
            className={s.city}
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            className={s.street}
            name="street"
            label="Street"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Street" />
          </Form.Item>
          <Form.Item
            className={s.zipCode}
            name="zipcode"
            label="Zip Code"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Zip Code" />
          </Form.Item>
          <Form.Item
            className={s.suite}
            name="suite"
            label="Suite"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Suite" />
          </Form.Item>
          <Form.Item
            className={s.phone}
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            className={s.website}
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Website" />
          </Form.Item>
          <h3>Company</h3>
          <Form.Item
            className={s.nameCompany}
            name="nameCompany"
            label="Name Company"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Name Company" />
          </Form.Item>
          <Form.Item
            className={s.bs}
            name="bs"
            label="BS"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="BS" />
          </Form.Item>
          <Form.Item
            className={s.catchPhrase}
            name="catchPhrase"
            label="Catch Phrase"
            rules={[
              {
                required: true,
                message: "Field is required!",
              },
            ]}
          >
            <Input placeholder="Catch Phrase" />
          </Form.Item>
          <Form.Item className={s.wrapperFooterButtons}>
            <div className={s.footerButtons}>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              {loading && <Spin />}
              <Button disabled={loading} type="primary" htmlType="submit">
                {!lngLat ? "Verify" : "Save"}
                {lngLat && <CheckOutlined />}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
