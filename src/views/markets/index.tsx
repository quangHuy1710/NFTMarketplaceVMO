import React from "react";
import { Flex, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { ListNFT } from "@/constants";
import handleBuyNFT from "./components/handleBuyNFT";

const MarketView = () => {
    return (
        <Flex justifyContent="flex-start" alignItems="flex-start" height="100vh" marginTop="1px">
            <SimpleGrid columns={4} spacing={10}>
                {ListNFT.map((nft, index) => (
                    <Box
                        key={index}
                        width="250px"
                        height="auto"
                        border="1px solid #ccc"
                        borderRadius="4px"
                        margin="10px"
                        padding="10px"
                        textAlign="center"
                        color="black"
                        position="relative"
                        display="flex"
                        flexDirection="column"
                    >
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "10px", background: "rgba(255, 255, 255, 0.8)", position: "absolute", top: 0, left: 0 }}>
                            <Text>ID: {nft.tokenId}</Text>
                        </div>
                        <Box flexGrow={1}>
                            <img src={nft.icon} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} />
                        </Box>
                        <Text fontWeight="bold" fontSize="20px">{nft.name}</Text>
                        <Text>{nft.des}</Text>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", background: "rgba(255, 255, 255, 0.8)" }}>
                            <button onClick={handleBuyNFT} style={{ marginLeft: "60px", background: "blue", color: "white", padding: "5px 10px", borderRadius: "4px" }}>Buy: {nft.price} BNB</button>
                        </div>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default MarketView;
