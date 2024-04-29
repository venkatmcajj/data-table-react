import React, { FC, useEffect, useState } from "react";
import CustomPagination from "./PageNation";
type HeadProps = {
  name: string;
  fieldname: string;
  view?: FC;
};
type PageProps = {
  title: string;
  heads: Array<HeadProps>;
  data: Array<any>;
  currentpage?: number;
  itemsperpage?: number;
  hasItemsPerPageDropdown?: boolean;
  hasPagination?: boolean;
  searchEnabled?: boolean;
};

export default function DataTable({
  title,
  data = [],
  heads = [],
  currentpage = 1,
  itemsperpage = 10,
  hasItemsPerPageDropdown = true,
  hasPagination = true,
  searchEnabled = true,
}: PageProps) {
  const [displayItems, setDisplayItems] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(currentpage);
  const [totalPages, setTotalPages] = useState(1);
  const [sortedItems, setsortedItems] = useState<any>([]);
  const [sortType, setSortType] = useState("asc");
  const [sortfield, setSortfield] = useState("");
  const [searchText, setSearchText] = useState("");
  const [itemsPerPage, setitemsPerPage] = useState(itemsperpage);

  const ProcessData = (items: Array<any>) => {
    setDisplayItems(
      items.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      )
    );
  };

  const SortDatas = (_data: Array<any>) => {
    if (sortfield) {
      const newarr = _data.slice();
      if (sortType === "asc") {
        newarr.sort((a, b) => {
          if (
            typeof a[sortfield] === "string" &&
            typeof b[sortfield] === "string"
          ) {
            return a[sortfield].localeCompare(b[sortfield]);
          }
          return a[sortfield] - b[sortfield];
        });
      } else {
        newarr.sort((a, b) => {
          if (
            typeof a[sortfield] === "string" &&
            typeof b[sortfield] === "string"
          ) {
            return b[sortfield].localeCompare(a[sortfield]);
          }
          return b[sortfield] - a[sortfield];
        });
      }
      setsortedItems(newarr);
    } else {
      setsortedItems(_data);
    }
  };
  useEffect(() => {
    ProcessData(sortedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortedItems]);
  useEffect(() => {
    if (searchText) {
      const items = data.filter((e) => {
        const str = JSON.stringify(e);
        return str.toLowerCase().includes(searchText.toLowerCase());
      });
      const total = Math.ceil(items.length / itemsPerPage);
      setTotalPages(total);
      SortDatas(items);
    } else {
      const total = Math.ceil(data.length / itemsPerPage);
      setTotalPages(total);
      SortDatas(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  useEffect(() => {
    SortDatas(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortfield, sortType]);
  useEffect(() => {
    const Initiate = () => {
      const total = Math.ceil(data.length / itemsPerPage);
      if (totalPages !== total) setTotalPages(total);
      if (currentPage !== 1) setCurrentPage(1);
      setsortedItems(data);
    };
    Initiate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, itemsPerPage]);
  return (
    <div className="card">
      <div className="card-header d-flex  align-items-center">
        {title && (
          <h3
            className="card-title text-color-1 mb-0"
            style={{ fontWeight: "200", fontSize: "22px" }}
          >
            {title}
          </h3>
        )}
        {searchEnabled && (
          <div className="d-flex ms-auto align-items-center">
            <input
              className="form-control mx-3"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="Search..."
            />
          </div>
        )}
        {hasItemsPerPageDropdown && (
          <div className="d-flex align-items-center">
            <label className="input-label" style={{ whiteSpace: "nowrap" }}>
              Items Per Page :{" "}
            </label>
            <select
              className="form-control"
              style={{ marginLeft: 10 }}
              value={itemsPerPage}
              onChange={(e) => {
                setitemsPerPage(parseInt(e.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-vcenter text-nowrap mb-0 table-striped table-bordered border-top"
            style={{ textAlign: "center" }}
          >
            <thead className="">
              <tr>
                {heads.map((item, index) => {
                  return (
                    <th key={item.name + index}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <label>{item.name}</label>
                        {item.fieldname && (
                          <div
                            style={{
                              flexDirection: "column",
                              display: "flex",
                              marginLeft: 10,
                            }}
                          >
                            {sortType === "asc" &&
                            sortfield === item.fieldname ? (
                              <svg
                                onClick={() => {
                                  setSortfield("");
                                }}
                                height={"16px"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                              >
                                <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                              </svg>
                            ) : (
                              <svg
                                onClick={() => {
                                  setSortType("asc");
                                  setSortfield(item.fieldname);
                                }}
                                height={"16px"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
                              </svg>
                            )}
                            {sortType === "desc" &&
                            sortfield === item.fieldname ? (
                              <svg
                                height={"14px"}
                                onClick={() => {
                                  setSortfield("");
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                              >
                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                              </svg>
                            ) : (
                              <svg
                                height={"14px"}
                                onClick={() => {
                                  setSortType("desc");
                                  setSortfield(item.fieldname);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {displayItems.length > 0 ? (
                displayItems.map((item: any, index: number) => {
                  let json: any = {};
                  if (searchText) {
                    Object.entries(item).forEach(
                      ([key, value]: [string, any]) => {
                        if (value)
                          json[key] = value
                            .toString()
                            .replace(
                              new RegExp(searchText, "gi"),
                              (match: any) => `<b>${match}</b>`
                            );
                      }
                    );
                  } else {
                    json = item;
                  }
                  return (
                    <tr key={index}>
                      {heads.map((col, colindex) =>
                        col.view ? (
                          <td key={colindex}>
                            <col.view {...item} />
                          </td>
                        ) : (
                          <td
                            key={colindex}
                            dangerouslySetInnerHTML={{
                              __html: json[col.fieldname],
                            }}
                          />
                        )
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center" colSpan={heads.length}>
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {hasPagination && data.length > 0 && (
          <div className="card-footer">
            <CustomPagination
              className="justify-content-center mb-0 mt-2"
              onPageChange={(val) => {
                setCurrentPage(val);
              }}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
