// src/Stopwatch.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const handleLapReset = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setTime(0);
      setLaps([]);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
  };

  return (
    <Container>
      <FixedContainer>
        <TimeDisplay>{formatTime(time)}</TimeDisplay>
        <ButtonContainer>
          <Button onClick={handleLapReset}>
            {isRunning ? 'Lap' : 'Reset'}
          </Button>
          <Button onClick={handleStartPause}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </ButtonContainer>
      </FixedContainer>
      <LapContainer>
        {laps.map((lap, index) => (
          <Lap key={index}>Lap {index + 1}: {formatTime(lap)}</Lap>
        ))}
      </LapContainer>
    </Container>
  );
};

export default Stopwatch;

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #f0f4f8;
  font-family: 'Arial', sans-serif;
`;

const FixedContainer = styled.div`
  position: fixed;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeDisplay = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #a0c4ff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #88b4e7;
  }
`;

const LapContainer = styled.div`
  margin-top: 200px; /* Fixed height to allow space for fixed buttons */
  width: 80%;
  overflow-y: auto;
  max-height: 60vh; /* Optional: Set max height to make it scrollable */
`;

const Lap = styled.div`
  font-size: 1.1rem;
  color: #555;
  padding: 5px;
  border-bottom: 1px solid #ccc;
`;
