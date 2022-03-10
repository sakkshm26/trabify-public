import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const List = ({ list }) => {

  const history = useNavigate()
  const items = list;

  const months = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC',
  }

  const handleClick = (id) => {
    history(`${id}`);
  }

  /* useEffect(() => {
    console.log(items);
  }, [items]) */

  return (
    <Box className='list' display="flex" justifyContent="space-evenly" flexWrap="wrap" overflow-y="scroll" marginBottom="30px">
      {!(list===null || list.length===0) ? list.map(book =>
        <Card sx={{ height: { xs: 265, sm: 290 }, width: 230, margin: { xs: "15px 20px", sm: "40px 30px" } }} key={book.id}>
          <CardMedia
            component="img"
            image={book.image}
            alt="Not found"
            sx={{ height: { xs: "140px", sm: "150px" } }}
          />
          <CardContent sx={{ padding: "16px 16px 0 16px" }}>
            <Typography gutterBottom variant="h7" component="div">
              {book.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subject: {book.subject}
            </Typography>
            <Typography variant="h6" component="p" marginBottom={{ xs: "-10px", sm: "0" }}>
              ₹ {book.price}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button size="small" sx={{ minWidth: "0px" }} onClick={() => handleClick(book.id)}>View</Button>
            <Typography variant="body2" color="text.secondary">
              {months[new Date(`${book.date_posted}`).getMonth()]}
              {" "}
              {new Date(`${book.date_posted}`).getDate()}
            </Typography>
          </CardActions>
        </Card>
      ) : <Typography sx={{marginTop:"30px", textAlign:"center"}}>No books available right now, please check later.</Typography>}
    </Box>
  )
}

export default List
