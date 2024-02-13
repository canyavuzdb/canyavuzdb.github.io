import styled from 'styled-components';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import './App.css';

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url('static/images/4.png') no-repeat center;
  background-size: cover;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <Container>
      <Hero />
      <Contact />
    </Container>
  );
}

export default App;
