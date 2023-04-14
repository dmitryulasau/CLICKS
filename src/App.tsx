import { useState, useEffect } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";

interface Count {
  location: string;
  count: number;
}

interface Response {
  country_name: string;
}

function App() {
  const [counts, setCounts] = useState<Count[]>(() => {
    const storedCounts = localStorage.getItem("clickCounts");
    return storedCounts !== null ? JSON.parse(storedCounts) : [];
  });

  const handleClick = async () => {
    try {
      const response = await axios.get<Response>("https://ipapi.co/json/");
      const country = response.data.country_name;

      const index = counts.findIndex((c) => c.location === country);
      if (index !== -1) {
        const newCounts = [...counts];
        newCounts[index].count++;
        setCounts(newCounts);
      } else {
        setCounts([...counts, { location: country, count: 1 }]);
      }

      await axios.post("/api/counts", { counts });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCounts = async () => {
    try {
      const response = await axios.get("/api/counts");
      setCounts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  useEffect(() => {
    localStorage.setItem("clickCounts", JSON.stringify(counts));
  }, [counts]);

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
        flexDirection: "column",
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
              {counts.reduce((acc, c) => acc + c.count, 0)}
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
      {counts.map((c) => (
        <Box
          mt="2rem"
          sx={{
            alignItems: "center",
            justifyItems: "center",
            alignContent: "center",
            maxWidth: "80rem",
            bgcolor: "#FFCECE",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10rem",
            padding: "1rem",
            marginBottom: "0.5rem",
            fontSize: "2rem",
          }}
          key={c.location}
        >
          <div>{c.location}</div>
          <div>{c.count}</div>
        </Box>
      ))}
    </Container>
  );
}

export default App;
