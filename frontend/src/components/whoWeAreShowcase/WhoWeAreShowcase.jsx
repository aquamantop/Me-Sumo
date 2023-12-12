import { Container, Paper, Box, Typography, Grid, Pagination, TextField } from "@mui/material";
import { PaperSXX } from "../customMui/CustomMui";

const WhoWeAreShowcase = () => {

  return (

    <>
      <Container sx={{ mb: 2 }}>
        <Paper sx={PaperSXX}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            border: "2px solid",
            borderColor: "secondary.main",
            borderRadius: "10px",
            margin: '-2px',
            position: 'relative',
            zIndex: 1,
            height:'30em',
            p: 2}}>
            <Box sx={{
              display: 'flex',
              justifyContent: "center",
              marginTop: "10px"
            }}>
              <Typography variant="h4" color="primary.main">
                <span style={{ color: 'primary.main', marginLeft:'10px'}}>¿Quiénes</span> Somos?
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '100%',
              marginTop: "-44px"
            }}>
              <Typography variant="h5" color="orange">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Ut ornare lectus sit amet est placerat in egestas erat. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Venenatis urna cursus eget nunc scelerisque viverra. Vel facilisis volutpat est velit egestas dui id.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
  </>
  );
};

export default WhoWeAreShowcase;