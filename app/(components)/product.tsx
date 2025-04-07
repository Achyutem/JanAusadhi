import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useDebounce from "../(hooks)/useDebounce";

type Product = {
  Sr_No: number;
  DrugCode: number;
  GenericName: string;
  UnitSize: string;
  MRP: number;
  GroupName: string;
};

function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetch("/ProductList.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const query = debouncedQuery.toLowerCase();

    return (
      product["GenericName"]
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase()) ||
      String(product["DrugCode"])
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase()) ||
      product["GroupName"].toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / Number(itemsPerPage));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * Number(itemsPerPage),
    currentPage * Number(itemsPerPage)
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  function highlightMatch(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-black rounded-sm px-1">
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h1 className="text-xl font-bold">Jan Ausadhi</h1>
        <Input
          type="text"
          placeholder="Search medicine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:w-64"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Drug Code</TableHead>
            <TableHead>Generic Name</TableHead>
            <TableHead>Unit Size</TableHead>
            <TableHead>MRP (₹)</TableHead>
            <TableHead>Group Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                {highlightMatch(String(product["DrugCode"]), searchQuery)}
              </TableCell>
              <TableCell>
                {highlightMatch(product["GenericName"], searchQuery)}
              </TableCell>
              <TableCell>{product["UnitSize"]}</TableCell>
              <TableCell>{product["MRP"]}</TableCell>
              <TableCell>
                {highlightMatch(product["GroupName"], searchQuery)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 w-full flex justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {visiblePages.map((page, idx, arr) => {
                const prev = arr[idx - 1];
                return (
                  <Fragment key={page}>
                    {prev && page - prev > 1 && (
                      <PaginationItem>
                        <span className="px-2 text-gray-500">...</span>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </Fragment>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Items per page:
            </span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
