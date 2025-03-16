import { FC, useState } from "react";
import { Input } from "../Input";
import "./signup.scss";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { AuthFailure, AuthSuccess } from "../../types/loginTypes";
import { useNavigate } from "react-router";
import { Role, UserSignUp } from "../../types/client/clientTypes";
import { signUpClient } from "../../slice/signUpSlice";

export const Signup: FC = () => {
  const dispatch = useDispatch<any>();
  const [signUpResponse, setSignUpResponse] = useState<
    AuthSuccess | AuthFailure
  >();
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const [form, setFormValue] = useState<UserSignUp>({
    name: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: Role.Viewer,
  });
  const navigate = useNavigate();

  const updateForm = (
    formKey: keyof UserSignUp,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;

    setFormValue({
      ...form,
      [formKey]: value,
    });
  };

  const handleFormSubmit = () => {
    const signUpCredentials: UserSignUp = form;
    const loginResponse = dispatch(signUpClient(signUpCredentials));
    loginResponse.then((res: any) => {
      const result: AuthSuccess | AuthFailure = res.payload;
      console.log(result);
      if ("message" in result) {
        setSignUpError(true);
        setSignUpResponse(result);
      }
      if ("name" in result) {
        setSignUpError(false);
        setSignUpResponse(result);
        navigate("/");
      }
    });
  };

  return (
    <div className="signup">
      <div className="signup-inner">
        <Input
          type="text"
          value={form.name}
          onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
            updateForm("name", evnt)
          }
          name="name"
          placeholder="Enter name..."
          className="inputfield"
          style={{ width: "250px" }}
        />

        <div className="secondaryinputs">
          <Input
            type="text"
            value={form.lastName}
            onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
              updateForm("lastName", evnt)
            }
            name="lastName"
            placeholder="Enter last name..."
            className="inputfield"
            style={{ width: "250px" }}
          />
        </div>

        <div className="secondaryinputs">
          <Input
            type="text"
            value={form.address}
            onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
              updateForm("address", evnt)
            }
            name="address"
            placeholder="Enter address..."
            className="inputfield"
            style={{ width: "250px" }}
          />
        </div>

        <div className="secondaryinputs">
          <Input
            type="text"
            value={form.phoneNumber}
            onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
              updateForm("phoneNumber", evnt)
            }
            name="phone-number"
            placeholder="Enter phone number..."
            className="inputfield"
            style={{ width: "250px" }}
          />
        </div>

        <div className="secondaryinputs">
          <Input
            type="text"
            value={form.email}
            onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
              updateForm("email", evnt)
            }
            name="email"
            placeholder="Enter email..."
            className="inputfield"
            style={{ width: "250px" }}
          />
        </div>

        <div className="secondaryinputs">
          <Input
            type="text"
            value={form.password}
            onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
              updateForm("password", evnt)
            }
            name="password"
            placeholder="Enter password..."
            className="inputfield"
            style={{ width: "250px" }}
          />
        </div>

        <div className="secondaryinputs">
          <select
            name="role"
            id="role"
            className="inputfield"
            style={{ width: "250px" }}
            onChange={(evnt: React.ChangeEvent<HTMLSelectElement>) =>
              updateForm("role", evnt)
            }
          >
            <option value={Role.Viewer}>{Role.Viewer}</option>
            <option value={Role.Editor}>{Role.Editor}</option>
            <option value={Role.Admin}>{Role.Admin}</option>
          </select>
        </div>

        {signUpError && (
          <div className="secondaryinputs">
            <span style={{ color: "red" }}>
              {(signUpResponse as AuthFailure).statusCode === 409
                ? (signUpResponse as AuthFailure).message
                : (signUpResponse as AuthFailure).message[0]}
            </span>
          </div>
        )}

        <div className="buttons">
          <Button
            type="submit"
            disabled={
              form.name.length < 1 ||
              form.lastName.length < 1 ||
              form.address.length < 1 ||
              form.email.length < 1 ||
              form?.password?.length! < 1
            }
            onClick={handleFormSubmit}
            className={"inputfield"}
            style={{
              backgroundColor: "green",
              width: "100%",
              opacity:
                (form.name.length < 1 ||
                  form.lastName.length < 1 ||
                  form.address.length < 1 ||
                  form.email.length < 1 ||
                  form?.password?.length! < 1) &&
                0.2,
            }}
            dangerouslySetInnerHTML={{ __html: "Register" }}
          />

          <Button
            onClick={() => navigate(-1)}
            className={"inputfield"}
            style={{
              backgroundColor: "brown",
              width: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: "Go Back" }}
          />
        </div>
      </div>
    </div>
  );
};
