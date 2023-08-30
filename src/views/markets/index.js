'use client'
import React, { useState } from "react";
import { Flex, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { ListNFT } from "@/constants";
import handleBuyNFT from "./components/handleBuyNFT";
import {
    pinata_api_key,
    pinata_secret_api_key,
    gateWayjwt,
    ipfsgateWay,
    readHeader,
    getHeader,
    sendJsonHeader
} from "../../../config";
import axios from "axios";
import { useEffect } from "react";

const MarketView = () => {
    const [listings, getListing] = useState([]);

    // useEffect(() => {
    //     fetchListings();
    // }, [])

    async function fetchListings() {
        const array = await readFileFromIPFS();
        getListing(array)
    }

    async function getFileFromIPFS() {
        const queryFilter = "metadata=[name]=NFT_Collection";
        const url = "https://api.pinata.cloud/data/pinList?" + queryFilter;
        const fetchFile = await axios.get(url, getHeader);
        const response = fetchFile.data;
        const output = response.map((value) => {
            let getCid = value.ipfs_pin_hash;
            return getCid;
        });
        return output;
    }

    async function readFileFromIPFS() {
        const output = await getFileFromIPFS();
        const listArray = [];
        let i = 0;
        for (i; i < output.length; i++) {
            const value = output[i];
            const ipfsPath = 'https://' + ipfsgateWay + '.mypinata.cloud/ipfs/' + value + '?pinataGatewayToken=' + gateWayjwt;
            const info = await axios.get(ipfsPath, readHeader)
            listArray.push(info.data.nftList)
        }
        return ipfsPath;
    }
    return (
        <Flex justifyContent="flex-start" alignItems="flex-start" height="100vh" marginTop="1px">
            <SimpleGrid columns={4} spacing={10}>
                {listings.map((list, index) => (
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
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "10px", background: "rgba(255, 255, 255, 0)", position: "absolute", top: 0, left: 0 }}>
                            <Text>ID: {list.name}</Text>
                        </div>
                        <Box flexGrow={1}>
                            <img src={list.image} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} />
                        </Box>
                        <Text fontWeight="bold" fontSize="20px">{nft.name}</Text>
                        <Text>{list.description}</Text>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", background: "rgba(255, 255, 255, 0.8)" }}>
                            <button onClick={handleBuyNFT} style={{ marginLeft: "60px", background: "blue", color: "white", padding: "5px 10px", borderRadius: "4px" }}>Buy: {list.price} BNB</button>
                        </div>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default MarketView;
