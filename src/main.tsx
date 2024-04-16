import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

const theme = extendTheme({
  colors: {
    dark: {
      100: '#656B70',
      200: '#171717',
      300: '#0C0C0C'
    },
    blue: {
      100: '#5969C9',
    },
    gray: {
      100: '#CFD4D9',
    },
    white: {
      100: '#FFF',
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
)
