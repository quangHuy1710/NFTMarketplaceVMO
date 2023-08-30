import { Button, Input, Stack, Image } from '@chakra-ui/react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import React, { useState, ChangeEvent, FormEvent } from 'react';
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
import axios from "axios";

//Test
const queryFilter = "metadata=[name]=NFT_Collection";
const url = "https://api.pinata.cloud/data/pinList?" + queryFilter;
const fetchFile = await axios.get(url, getHeader);
// const response = fetchFile.data.columns;
// const output = response.map((value) => {
//     let getCid = value.ipfs_pin_hash;
//     return getCid;
// });
console.log(fetchFile);

// End test
const Create = () => {
    const pinataLogo = "https://app.pinata.cloud/pinnieLogoLight.3e410ce9fab09fec5e2462a4e61ddea3.svg"
    const [picCid, getPicCid] = useState('');
    const [image, getImage] = useState(pinataLogo)
    // const [fileUrl, setFileUrl] = useState(null);
    // const [cid, setCid] = useState(null)
    // const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    // const router = useRouter();

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
        // try {
        const response = await axios.post(url, data, sendJsonHeader);
        const hash = `ipfs://${response.data.IpfsHash}`;
        return hash;
        // } catch (error) {
        //     console.error("Error pinning JSON to IPFS:", error);
        // }
    }
    async function listNFT() {
        let getName = document.getElementById("name").value.toString();
        let getDes = document.getElementById("Des").value.toString();
        let getPrice = document.getElementById('price').value.toString();

        if (!getName || !getDes || !getPrice) return
        const receipt = await sendJSONToIPFS(getName, getDes, getPrice, picCid)
        console.log(receipt);
        console.log("Test");
    }
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [image, setImage] = useState < File | null > (null);



    return (
        <div>
            <form>
                <div>
                    <Input id='name' placeholder='Enter your NFT name' />
                </div>
                <div>
                    <Input id='Des' mt="20px" mb="20px" placeholder='Enter your NFT description' size='lg' />
                </div>
                <div>
                    <label>Enter your NFT price:</label>
                    <NumberInput id='price' style={{ width: '100px' }} defaultValue={1} precision={2} step={0.05}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </div>
                <div>
                    <label>Attach your NFT image:</label>
                    <input id='image' style={{ marginLeft: "15px" }} onChange={updateImage} type="file" accept="image/*" required />
                </div>
                <Stack direction='row'>
                    <Image
                        boxSize='auto'
                        objectFit='cover'
                        src={image}
                    />
                </Stack>
                <Button onClick={listNFT} style={{ backgroundColor: "rgba(52, 255, 224, 1)" }} variant="outline" mt="50px">Create</Button>
            </form>
        </div >
    );
};

export default Create;