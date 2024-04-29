import React from "react";
import "jest-canvas-mock";
import { render } from "@testing-library/react";
import { DataTable } from "../src";
import fetchmock from "jest-fetch-mock";
fetchmock.dontMock();
describe("Common render", () => {
  test("renders without crashing", () => {
    const title = "Test DataTable";
    const heads = [
      { name: "ID", fieldname: "id" },
      { name: "Name", fieldname: "name" },
    ];
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Doe" },
    ];
    render(
      <DataTable
        title={title}
        heads={heads}
        data={data}
        currentpage={1}
        itemsperpage={10}
        hasItemsPerPageDropdown={true}
        hasPagination={true}
      />
    );
  });
});
