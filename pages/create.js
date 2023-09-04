import React from "react";
import Head from "next/head";
import { useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { nftAddress, nftMarketAddress } from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import Image from 'next/image'
import { useRouter } from 'next/router';
import {
    pinata_api_key,
    pinata_secret_api_key,
    gateWayjwt,
    ipfsgateWay,
    readHeader,
    getHeader,
    sendJsonHeader,
    apikey,
    apisecret
} from "../config";

const create = () => {
    async function sendFileToIPFS(file) {
        const formData = new FormData();
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        formData.append("file", file);
        const opts = JSON.stringify({
            "cidVersion": 1,
        })
        formData.append("pinataOptions", opts);
        const options = {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: apikey,
                pinata_secret_api_key: apisecret,
                Accept: "text/plain"
            }
        }
        const sendPic = await axios.post(url, formData, options);
        return sendPic.data.IpfsHash;
    }
    async function updateImage(e) {
        const file = e.target.files[0];
        const getCid = await sendFileToIPFS(file);
        getPicCid(getCid);
        const ipfsPath = 'https://' + ipfsgateWay + '.mypinata.cloud/ipfs/' + getCid + '?pinataGatewayToken=' + gateWayjwt;
        getImage(ipfsPath);

    }
    async function sendJSONToIPFS(getName, getDes, getPrice, picCid) {
        const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
        // const cid = await sendFileToIPFS(file);
        // const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/' + cid;
        const data = JSON.stringify({
            "pinataMetadata": {
                "name": "NFT_Collection"
            },
            "pinataOptions": {
                "cidVersion": 1
            },
            "pinataContent": {
                "nftList": {
                    "name": getName,
                    "description": getDes,
                    "price": getPrice,
                    "image": 'https://' + ipfsgateWay + '.mypinata.cloud/ipfs/' + picCid + '?pinataGatewayToken=' + gateWayjwt,
                    // "image": ipfsGateway.toString()
                }
            }
        });
        try {
            const response = await axios.post(url, data, sendJsonHeader);
            const hash = `ipfs://${response.data.IpfsHash}`;
            return hash;
        } catch (error) {
            console.error("Error pinning JSON to IPFS:", error);
        }
    }

    const [fileUrl, setFileUrl] = useState(null);
    const [cid, setCid] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter();
    async function onChange(e) {
        try {
            if (formInput.name.length > 0 &&
                formInput.description.length > 0 &&
                formInput.price.length > 0) {

                const file = e.target.files[0];
                const receipt = await sendJSONToIPFS(formInput.name,
                    formInput.description, file,
                    formInput.price);
                setCid(receipt.toString());
                const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/';
                const cid = receipt.replace('ipfs://', '');
                const tokenUriWithGateway = ipfsGateway + cid;
                //  console.log(tokenUriWithGateway.toString());
                console.log("Wait a minute to create metadateuri");
                const meta = await axios.get(tokenUriWithGateway);
                setFileUrl(meta.data.image.toString());
                console.log(fileUrl.toString());
                console.log(formInput.name);
                console.log(formInput.description);
                console.log(formInput.price);

                console.log("Load Done!");
                console.log("Click CREATE to create a new token");
            } else {
                console.log("Field is empty");
            }
        } catch (error) {
            console.log("Service Fail ,Please try again after 15 minutes!");
        }

    }

    //2. Create item for sale
    async function createItem() {
        try {
            if (cid != "") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                //Contract NFT
                let nft = new ethers.Contract(nftAddress, NFT.abi, signer);
                //  console.log(cid);
                let transaction = await nft.createToken(cid);
                let tx = await transaction.wait();
                let tokenId = tx.events[0].args[2].toNumber();
                const price = ethers.utils.parseUnits(formInput.price, 'ether');
                console.log(tokenId);
                //Contract MarketPlace
                console.log("wait a minute to continue the second transaction");
                let market = new ethers.Contract(nftMarketAddress, Market.abi, signer);
                let listingPrice = await market.getListingPrice();
                listingPrice = listingPrice.toString();
                await market.createMarketItem(nftAddress, tokenId, price,
                    { value: listingPrice });
                alert("Created NFT");
                setTimeout(() => {
                    router.reload();
                }, 2000);
            } else {
                console.log("Upload metadata failed");
            }
        } catch (error) {
            console.log("Fail");
        }
    }

    return (
        <div>
            <Head>
                <title>Listing NFT</title>
            </Head>
            <div>
                <div>
                    <h1>
                        Create And Listing NFT <br />
                    </h1>
                </div>
                <div>
                    <input
                        required
                        placeholder="Name"
                        onChange={(e) =>
                            updateFormInput({ ...formInput, name: e.target.value })
                        }
                    />
                    <textarea
                        required
                        placeholder="Description"
                        onChange={(e) =>
                            updateFormInput({ ...formInput, description: e.target.value })
                        }
                        rows={7}
                    />
                    <input
                        required
                        placeholder="Price in Eth"
                        type="number"
                        onChange={(e) =>
                            updateFormInput({ ...formInput, price: e.target.value })
                        }
                    />
                    <input type="file" name="Asset"
                        onChange={onChange} />
                    {
                        fileUrl && (
                            <img
                                src={fileUrl}
                                alt="NFT"
                            />
                        )
                    }

                </div>

                <div>
                    <button onClick={createItem} >
                        Create NFT
                    </button>
                </div>
            </div>
        </div>
    );
};
export default create;