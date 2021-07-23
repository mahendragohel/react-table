import "./styles.css";
import Table from "./Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const columns = {
    command: {
      order: 1,
      name: "Command",
      transform: (values) => {
        return values;
      }
    },
    dataRequired: {
      order: 3,
      name: "Data Required",
      transform: () => {}
    },
    commandDetails: {
      isChild: true,
      order: 2,
      name: "Command Details",
      transform: (values) => {
        return (
          <ul>
            {values.map((value) => (
              <li>{value}</li>
            ))}
          </ul>
        );
      }
    }
  };

  const childColumns = {
    title1: {
      order: 1,
      name: "Title 1"
    },
    title2: {
      order: 3,
      name: "Title 2"
    },
    title3: {
      order: 2,
      name: "Title 3"
    }
  };

  const results = [
    {
      dataRequired: "Lorem Ipsum",
      command: "Axx0",
      commandDetails: [{ title1: "1111", title2: "2222", title3: "3333" }]
    },
    {
      dataRequired: "Lorem Ipsum",
      command: "Axx1",
      commandDetails: [{ title1: "1111", title2: "2222", title3: "3333" }]
    },
    {
      dataRequired: "Lorem Ipsum",
      command: "Axx2",
      commandDetails: [{ title1: "1111", title2: "2222", title3: "3333" }]
    },
    {
      command: "Axx3",
      dataRequired: "Lorem Ipsum",
      commandDetails: [{ title1: "1111", title2: "2222", title3: "3333" }]
    }
  ];
  return (
    <div className="App">
      <Table
        child={(row) => {
          return <Table columns={childColumns} rows={row.commandDetails} />;
        }}
        columns={columns}
        rows={results}
        actions={(row) => {
          return (
            <div>
              <Button
                onClick={() => {
                  alert(row.command);
                }}
              >
                Alert
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
