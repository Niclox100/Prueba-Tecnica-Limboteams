import { FC } from "react";

import { DataInterface } from "../../services/service";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import "./styles.scss";


interface DataCardProps {
  data: DataInterface;
  onClick: () => void;
}

export const DataCard: FC<DataCardProps> = ({ data, onClick }) => {
  
  return (
    <Card 
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
      <CardMedia sx={{ height: 180 }} image="/image-placeholder.webp" title="placeholder image" />
      <CardContent>
        <div className="card-content__container">
          <h3 className="card-content__title">{data.title}</h3>
          <p className="card-content__paragraph">{data.body}</p>
        </div>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button
          size="medium"
          onClick={onClick}
        >
          Ver mas
        </Button>
      </CardActions>
    </Card>


  )
}