import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

function DataTable() {
  const [activePage, setActivePage] = useState(0);
  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    totalPages: 0,
    totalElements: 0,
    number: 0,
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${activePage}&size=10&sort=date,desc`)
      .then(response => {
        setPage(response.data);
      });
  }, [activePage]);

  function changePage(index: number) {
    setActivePage(index);
  }

  return (
    <>
      <Pagination page={page} onChangePage={changePage} />

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map(sale => (
              <tr key={sale.id}>
                <td>{formatLocalDate(sale.date, 'dd/MM/yyyy')}</td>
                <td>{sale.seller.name}</td>
                <td>{sale.visited}</td>
                <td>{sale.deals}</td>
                <td>{sale.amount.toFixed(2).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;