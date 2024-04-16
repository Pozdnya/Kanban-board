import { Box, Spinner } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useAppSelector } from "./store/hooks";

function App() {
  const { boards, isLoading, error } = useAppSelector(state => state.issues)

  return (
    <Box p={4} display='flex' flexDirection='column' gap={8}>
      <Header />
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        {isLoading && <Spinner size='xl' />}
        {!!boards.length && !isLoading && !error && <Main />}
      </Box>
    </Box>
  );
}

export default App;
