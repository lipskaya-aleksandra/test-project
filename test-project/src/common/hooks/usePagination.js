import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = {
    page: 1,
    perPage: 10,
  };

  function updatePageParams(newParams) {
    setSearchParams((prevParams) => {
      for (const [key, value] of prevParams) {
        pageParams[key] = Number(value);
      }
      return { ...pageParams, ...newParams };
    });
  }

  return [pageParams, updatePageParams];
}
