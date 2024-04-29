import React, { useEffect, useState } from "react";
import "./app.css";
import { DataTable } from "data-table-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetCountries } from "react-country-state-city";
export default function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    GetCountries().then((res) => {
      setCountries(res);
    });
  }, []);
  return (
    <DataTable
      title="Countries"
      data={countries}
      heads={[
        { name: "Name", fieldname: "name" },
        { name: "Capital", fieldname: "capital" },
        { name: "Currency", fieldname: "currency" },
        { name: "Currency Symbol", fieldname: "currency_symbol" },
        { name: "Native", fieldname: "native" },
        { name: "Region", fieldname: "region" },
        {
          name: "Name With Custom View",
          fieldname: "",
          view: (item) => <h5>{item.name}</h5>,
        },
      ]}
    />
  );
}
