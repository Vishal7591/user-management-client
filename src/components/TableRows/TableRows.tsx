import { Button } from "../Button";
import { Input } from "../Input";
import "./table-rows.module.scss";
import React from "react";
import {
  Role,
  TableRowProps,
  UserSignUp,
} from "../../types/client/clientTypes";

const TableRows: React.FunctionComponent<TableRowProps> = ({
  rowsData,
  deleteTableRows,
  handleChange,
}) => {
  return (
    <React.Fragment>
      {rowsData.map((data: UserSignUp, index: number) => {
        const { name, lastName, address, email, phoneNumber, role } = data;

        return (
          <tr key={`${email}_${index}`}>
            <td data-label="Name">
              <Input
                type="text"
                value={name}
                onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, evnt)
                }
                name="name"
                placeholder="Enter name..."
                className="inputfield"
              />
            </td>
            <td data-label="Last Name">
              <Input
                type="text"
                value={lastName}
                onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, evnt)
                }
                name="lastName"
                placeholder="Enter last name..."
                className="inputfield"
              />
            </td>
            <td data-label="Address">
              <Input
                type="text"
                value={address}
                onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, evnt)
                }
                name="address"
                placeholder="Enter address..."
                className="inputfield"
              />
            </td>
            <td data-label="Email">
              <Input
                type="text"
                value={email}
                placeholder="Enter email..."
                onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, evnt)
                }
                name="email"
                className="inputfield"
              />
            </td>
            <td data-label="Phone Number">
              <Input
                type="text"
                value={phoneNumber}
                placeholder="Enter phone number..."
                onChange={(evnt: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, evnt)
                }
                name="phoneNumber"
                className="inputfield"
              />
            </td>
            <td data-label="Role">
              <select
                name="role"
                onChange={(evnt: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange(index, evnt)
                }
                className="selectfield"
                defaultValue={role}
              >
                <option value={Role.Viewer}>{Role.Viewer}</option>
                <option value={Role.Editor}>{Role.Editor}</option>
                <option value={Role.Admin}>{Role.Admin}</option>
              </select>
            </td>
            <td>
              <Button
                onClick={() => deleteTableRows(index)}
                dangerouslySetInnerHTML={{ __html: "Remove" }}
                style={{ backgroundColor: "red", width: "50%" }}
              />
            </td>
          </tr>
        );
      })}
    </React.Fragment>
  );
};

export default TableRows;
