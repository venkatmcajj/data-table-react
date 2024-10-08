import React from "react";
import Pagination from "react-bootstrap/Pagination";
type PageProps = {
  totalPages: number;
  currentPage: number;
  onPageChange?: (pageno: number) => void;
  className?: string;
};
const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PageProps) => {
  const handlePageChange = (page: number) => {
    if (onPageChange) onPageChange(page);
  };
  const renderPaginationItems = () => {
    const items = [];

    // Display ellipsis and first page if currentPage is more than 3
    if (currentPage > 3) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          {1}
        </Pagination.Item>
      );

      if (currentPage > 4) {
        items.push(<Pagination.Ellipsis key="ellipsis-left" />);
      }
    }

    // Display current page and neighboring pages
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(currentPage + 2, totalPages);
      i++
    ) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Display ellipsis and last page if currentPage is less than totalPages - 2
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        items.push(<Pagination.Ellipsis key="ellipsis-right" />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };
  return (
    <Pagination className={className}>
      <Pagination.First
        title="First"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        title="Previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {renderPaginationItems()}
      <Pagination.Next
        title="Next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        title="Last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default CustomPagination;
