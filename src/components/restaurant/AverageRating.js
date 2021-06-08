import React from "react";
import { FaStar } from "react-icons/fa";
import { Box, Icon } from "@chakra-ui/react";

export default function AverageRating({ ratingCount = 0, totalRating = 0 }) {
  if (!ratingCount && !totalRating) return null;

  const averageRage = Math.round(totalRating / ratingCount);

  return (
    <Box>
      {Array(averageRage)
        .fill(1)
        .map((rate, index) => (
          <Icon
            key={rate + index}
            color="yellow.500"
            as={FaStar}
            fontSize="md"
          />
        ))}
    </Box>
  );
}
