import { useState, useEffect } from "react";
import { DataInterface, getData } from "../../services/service";
import { DataCard } from "../Card";
import SearchBar from "../SearchBar";

import "./styles.scss";
import { Modal } from "../Modal";

export const Home = () => {
  const [data, setData] = useState<DataInterface[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<DataInterface | null>(null);

  const itemsPerPage: number = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData({limit:itemsPerPage, page: page})
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const openModal = (item: DataInterface) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section className="home">
      <div className="home__wrapper">
        <h1 className="home__title">Lista de Cards</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <div className="loading-spinner">Cargando...</div>}
        <div className="home__container">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id}>
                <DataCard data={item} onClick={() => openModal(item)}/>
              </div>
            ))
          ) : (
            <div className="home__noFound">No se encontraron cards que cumplan con los requisitos</div>
          )}
        </div>
          {filteredData.length > 0 && (
            <div className="home__pagination-container">
              <button
                className="home__pagination-button"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Anterior
              </button>
              <button
                className="home__pagination-button"
                onClick={handleNextPage}
              >
                Siguiente
              </button>
          </div>
          )}
      </div>

      {selectedItem && <Modal data={selectedItem} onClose={closeModal} />}
    </section>
  );
};
