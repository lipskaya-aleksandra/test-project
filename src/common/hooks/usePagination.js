import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams, setPageParams] = useState({
    page: 1,
    perPage: 10,
  });

  useEffect(() => {
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = Number(value);
    }
    setPageParams(params);
  }, []);

  function updatePageParams(newParams) {
    // setSearchParams((prevParams) => {
    //   for (const [key, value] of prevParams) {
    //     pageParams[key] = Number(value);
    //   }
    //   return { ...pageParams, ...newParams };
    // });
    setPageParams((prevParams) => {
      setSearchParams({ ...prevParams, ...newParams });
      return { ...prevParams, ...newParams };
    });
  }

  return [pageParams, updatePageParams];
}
