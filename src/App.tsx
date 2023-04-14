import { useState, useEffect } from "react";
import "./App.css";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function App() {
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("clickCount");
    return storedCount !== null ? parseInt(storedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("clickCount", count.toString());
  }, [count]);

  function handleClick() {
    setCount(count + 1);
  }

  function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt="10rem" sx={{ fontSize: "4rem", color: "#0088BE" }}>
              TOTAL CLICKS:
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              mt="5rem"
              sx={{
                width: "12rem",
                height: "12rem",
                padding: "4rem",
                borderRadius: "50%",
                bgcolor: "#FB6D85",
                fontSize: "4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {count}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              mt="5rem"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  maxWidth: "30rem",
                  fontSize: "2rem",
                  fontFamily: ' "Press Start 2P", sans-serif;',
                  padding: "2rem 4rem",
                }}
                onClick={handleClick}
                variant="contained"
              >
                CLICK ME!
              </Button>
              <Button
                sx={{
                  maxWidth: "30rem",
                  fontSize: "2rem",
                  fontFamily: '"Press Start 2P", sans-serif;',
                  padding: "1rem 2rem",
                }}
                onClick={clearLocalStorage}
                variant="outlined"
                color="error"
              >
                CLEAR
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
