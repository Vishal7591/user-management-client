import React, { useState, useEffect } from "react";
import TableRows from "../TableRows/TableRows";
import "./add-remove-client.scss";
import { Button } from "./../Button";
import { validateEmail } from "../../utils/helper";
import { Role, UserSignUp } from "../../types/client/clientTypes";
import type { RootState } from "../../store/configureStore";
import { fetchClient } from "../../slice/clientSlice";
import { updateClient } from "../../slice/clientUpdateSlice";
import { useSelector, useDispatch } from "react-redux";

export const AddRemoveClient: React.FunctionComponent = () => {
  const dispatch = useDispatch<any>();
  const [rowsData, setRowsData] = useState<any[]>([]);
  const [sortedList, setSortedList] = useState<boolean>(false);
  const [saveMessageVisibility, setSaveMessageVisibility] =
    useState<boolean>(false);
  const [addClientButtonDisabled, setAddClientButtonDisabled] =
    useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [searchedEmail, setSearchedEmail] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<any>([]);

  useEffect(() => {
    const data = dispatch(fetchClient());
    data.then((response: any) => {
      setRowsData(JSON.parse(JSON.stringify(response.payload)));
    });
  }, [dispatch]);

  useEffect(() => {
    const containEmptyFields = (element: UserSignUp) =>
      element.email === "" || element.name === "";
    setSaveMessageVisibility(false);
    const containsValidEmail = (client: UserSignUp) =>
      validateEmail(client.email);
    setSaveButtonDisabled(
      !rowsData.every(containsValidEmail) || rowsData.some(containEmptyFields)
    );
    setAddClientButtonDisabled(
      !rowsData.every(containsValidEmail) || rowsData.some(containEmptyFields)
    );
  }, [rowsData]);

  const success = useSelector(
    (state: RootState) => state.clientUpdate.common.success
  );

  const searchEmployeeByEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let searchedEmail: string = event.target.value;
    if (validateEmail(searchedEmail)) {
      const foundEmail = rowsData.find(
        (client: UserSignUp) => client.email === searchedEmail
      );
      if (foundEmail !== undefined) {
        setSearchedEmail(searchedEmail);
        setFilteredEmployees([foundEmail]);
      } else {
        setSearchedEmail(searchedEmail);
        setFilteredEmployees([]);
        setRowsData([...rowsData]);
      }
    } else {
      setSearchedEmail(searchedEmail);
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
  };

  const filterEmployeesByStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let selectedStatus: string = event.target.value;
    const foundUser = rowsData.filter(
      (client: UserSignUp) =>
        client?.role?.toLowerCase() === selectedStatus.toLowerCase()
    );
    if (foundUser.length > 0) {
      setFilteredEmployees(foundUser);
    } else {
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
  };

  const addTableRows = () => {
    const rowsInput: UserSignUp = {
      name: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumber: "",
      role: Role.Viewer || Role.Editor || Role.Admin,
    };
    setSaveButtonDisabled(true);
    setAddClientButtonDisabled(true);
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index: number) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (
    index: number,
    evnt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    console.log("rowsInput-----", rowsData);
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
    if (
      (name === "email" &&
        validateEmail(value) &&
        rowsInput[index]["name"].value !== "") ||
      (name === "name" &&
        value !== "" &&
        validateEmail(rowsInput[index]["email"]))
    ) {
      setAddClientButtonDisabled(false);
      setSaveButtonDisabled(false);
    }
  };

  const saveButtonClick = () => {
    const updateData = dispatch(updateClient(rowsData));
    updateData.then((response: any) => {
      setRowsData(JSON.parse(JSON.stringify(response.payload)));
      setSaveMessageVisibility(true);
    });
  };

  const sortButtonClick = () => {
    let tempList: UserSignUp[] = [...rowsData];
    tempList.sort((obj1, obj2) => (obj1.name > obj2.name ? 1 : -1));
    if (sortedList === false) {
      setSortedList(true);
      setFilteredEmployees(tempList);
    } else {
      setSortedList(false);
      setFilteredEmployees([]);
      setRowsData([...rowsData]);
    }
  };

  return (
    <div>
      <div className="appheading">Client App</div>
      <div className="search-add-section">
        <div className="search-and-add-inner">
          <span>Search a User by Email</span>
          <input
            type="text"
            className="inputfield"
            style={{ width: "90%" }}
            value={searchedEmail}
            placeholder="Enter email here..."
            onChange={searchEmployeeByEmail}
          />
        </div>
        <div className="search-and-add-inner">
          <span>Filter Users by Role</span>
          <select
            name="status"
            onChange={filterEmployeesByStatus}
            className="inputfield selectfield"
            style={{ color: "#888888", width: "90%" }}
          >
            <option value="select">Select role</option>
            <option value={Role.Viewer}>{Role.Viewer}</option>
            <option value={Role.Editor}>{Role.Editor}</option>
            <option value={Role.Admin}>{Role.Admin}</option>
          </select>
        </div>
        <div
          className="search-and-add-inner"
          style={{ paddingBlockStart: "1%" }}
        >
          <Button
            onClick={sortButtonClick}
            className={"inputfield"}
            style={{ backgroundColor: "brown", width: "100%" }}
            dangerouslySetInnerHTML={{ __html: "Sort by Name" }}
          />
        </div>
        <div
          className="search-and-add-inner"
          style={{ paddingBlockStart: "1%" }}
        >
          <Button
            onClick={addTableRows}
            className={"inputfield"}
            disabled={addClientButtonDisabled}
            style={{
              backgroundColor: addClientButtonDisabled ? "darkgrey" : "green",
              width: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: "Add Client" }}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr style={{ backgroundColor: "lightgrey" }}>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col"> Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <TableRows
            rowsData={
              filteredEmployees.length > 0 ? filteredEmployees : rowsData
            }
            deleteTableRows={deleteTableRows}
            handleChange={handleChange}
          />
        </tbody>
      </table>
      <div className="savebutton-section">
        <Button
          onClick={saveButtonClick}
          className="savebutton"
          disabled={saveButtonDisabled}
          style={{
            textTransform: "uppercase",
            color: "white",
            backgroundColor: saveButtonDisabled ? "lightgrey" : "midnightblue",
          }}
          dangerouslySetInnerHTML={{ __html: "SAVE CHANGES" }}
        />

        {saveMessageVisibility && (
          <span style={{ color: "red" }}>Changes saved successfully!</span>
        )}
      </div>
    </div>
  );
};
