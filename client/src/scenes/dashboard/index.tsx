import { Box, useMediaQuery } from '@mui/material'
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';


const girdTemplateLarge = `
  "a b c"
  "a b c"
  "a b c"
  "d b f"
  "d e f"
  "d e f"
  "g e f"
  "g h i"
  "g h i"
  "g h i"
`
const gridTemplateSmall= `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"

`

const Dashboard = () => {
  
  const isAboveMedScreen = useMediaQuery("(min-width: 1200px)");
  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
    sx={
      isAboveMedScreen ? {
      gridTemplateColumns:"repeat(3, minmax(370px, 1fr))",// one fractional unit with min length of 370px
      gridTemplateRows:"repeat(10, minmax(35px, 1fr))",
      gridTemplateAreas: girdTemplateLarge,
    } : {
      gridAutoColumns: "1fr",
      gridAutoRows: "80px",
      gridTemplateAreas: gridTemplateSmall
    }}
    > 
    <Row1 />
    <Row2 />
    <Row3 />
    </Box> 
  )
}

export default Dashboard