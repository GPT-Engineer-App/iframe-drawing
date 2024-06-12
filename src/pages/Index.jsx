import React, { useRef, useEffect, useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

// Mondrian color palette
const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];

const Index = () => {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Resize canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set up drawing
    let drawing = false;

    const startDrawing = (e) => {
      drawing = true;
      draw(e);
    };

    const endDrawing = () => {
      drawing = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!drawing) return;
      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = currentColor;

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    // Event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);

    // Cleanup event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [currentColor]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <HStack position="absolute" top={4} left={4} spacing={4}>
        {colors.map((color) => (
          <Button
            key={color}
            backgroundColor={color}
            width="40px"
            height="40px"
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default Index;