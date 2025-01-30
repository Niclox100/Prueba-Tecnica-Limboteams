import { useEffect, useState } from "react";
import { DataInterface, getAuthorName } from "../../services/service";
import "./styles.scss";

export const Modal = ({ data, onClose }: { data: DataInterface; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getAuthorName(data.userId);
        setAuthorName(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          {loading ? (
            <div className="loading-spinner">Cargando...</div>
          ) : (
            <div className="modal-body">
              <h1 className="modal-author-name">{authorName}</h1>
              <h2 className="modal-title">{data.title}</h2>
              <p className="modal-body-text">{data.body}</p>
              <button onClick={onClose} className="modal-close-button">Cerrar</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
