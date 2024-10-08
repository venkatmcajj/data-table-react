import React, { useState } from "react";
import "./app.css";
import { PageNation } from "react-jquery-data-table";
import "bootstrap/dist/css/bootstrap.min.css";
export default function PageNationOnly() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <PageNation
      currentPage={currentPage}
      totalPages={100}
      onPageChange={(_pageno) => setCurrentPage(_pageno)}
      className="justify-content-center mb-0 mt-2"
    />
  );
}
