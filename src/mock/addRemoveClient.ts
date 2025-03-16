import { Client } from "../types/client/clientTypes";

export const clientMock: Client[] = [
  {
    id: "8de74fe3-84a7-48bd-bc0e-c578e1e199e0",
    name: "Kurt Cobain",
    useremail: "kurt.cobain@gmail.com",
    dob: new Date("1989-04-10T18:30:00.000Z"),
    status: "ACTIVE"
  },
  {
    id: "a86dee3c-8ed6-4ac3-814d-a6e287817c33",
    name: "Bruce Springsteen",
    useremail: "jeff.roberts@gmail.com",
    dob: new Date("1989-03-15T18:30:00.000Z"),
    status: "PENDING"
  },
  {
    id: "8c3f8f51-900c-46cc-9cad-025e6ef3155f",
    name: "Rob Thomas",
    useremail: "rob.thomas@gmail.com",
    dob: new Date("1989-12-28T18:30:00.000Z"),
    status: "BLOCKED"
  }
];
