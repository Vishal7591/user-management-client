import { FC, useState } from "react";
import { Input } from "../Input";
import "./login.scss";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import {
  AuthFailure,
  AuthSuccess,
  LoginCredentials,
} from "../../types/loginTypes";
import { useNavigate } from "react-router";
import { loginClient } from "../../slice/loginSlice";

export const Login: FC = () => {
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginResponse, setLoginResponse] = useState<
    AuthSuccess | AuthFailure
  >();
  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const submitLoginCredentials = () => {
    const userCredentials: LoginCredentials = {
      email: email,
      password: password,
    };

    const loginResponse = dispatch(loginClient(userCredentials));
    loginResponse.then((res: any) => {
      const result: AuthSuccess | AuthFailure = res.payload;
      console.log(result);

      if ("message" in result) {
        setCredentialsError(true);
        setLoginResponse(result);
      }
      if ("user" in result) {
        setCredentialsError(false);
        setLoginResponse(result);
        navigate("/manage-client");
      }
    });
  };

  return (
    <div className="login">
      <div className="login-inner">
        <Input
          type="email"
          value={email}
          onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
            handleEmailChange(evnt.target.value)
          }
          name="name"
          placeholder="Enter email..."
          style={{ width: "250px" }}
        />

        <div className="passwordinput">
          <Input
            type="password"
            value={password}
            onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
              handlePasswordChange(evnt.target.value)
            }
            name="password"
            placeholder="Enter password..."
            style={{ width: "250px" }}
          />
        </div>
        {credentialsError && (
          <div className="passwordinput">
            <span style={{ color: "red" }}>
              {(loginResponse as AuthFailure).message}
            </span>
          </div>
        )}

        <div className="buttons">
          <Button
            disabled={email.length < 1 || password.length < 1}
            onClick={submitLoginCredentials}
            className={"inputfield"}
            style={{
              backgroundColor: "green",
              width: "100%",
              opacity: (email.length < 1 || password.length < 1) && 0.2,
            }}
            dangerouslySetInnerHTML={{ __html: "Login" }}
          />

          <Button
            onClick={() => navigate("/signup")}
            className={"inputfield"}
            style={{
              backgroundColor: "brown",
              width: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: "Signup" }}
          />
        </div>
      </div>
    </div>
  );
};
