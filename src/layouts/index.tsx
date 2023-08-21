declare var window: any;
import React, { ReactNode } from "react";
import { Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import { ConnectWallet, WalletInfo } from "@/components";
import { IWalletInfo } from "@/_types_";
import { menus } from "@/constants";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { Wallet, ethers } from "ethers";

interface IProps {
    children: ReactNode;
}

export default function MainLayout({ children }: IProps) {
    const [wallet, setWallet] = React.useState<IWalletInfo>();
    const [Web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>();

    const onConnectMetamask = async () => {

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
            console.log(provider)
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balance = await signer.getBalance();
            const bnbbalance = Number.parseFloat(ethers.utils.formatEther(balance));
            setWallet({ address, bnb: bnbbalance });
            setWeb3Provider(provider);
        }
    }
    return (
        <Flex
            w={{ base: "full", lg: "80%" }}
            flexDirection="column"
            margin="50px auto"
        >
            <Flex>
                <Heading size='lg' fontWeight='bold'>
                    NFT Marketplace
                </Heading>
                <Spacer />
                {menus.map((menu) => (
                    <Link href={menu.url} key={menu.url} >
                        <Text mx="20px" fontSize="20px" color="blue.500">
                            {menu.name}
                        </Text>
                    </Link>
                ))}
                <Spacer />
                {!wallet && <ConnectWallet onClick={onConnectMetamask} />}
                {wallet &&
                    <WalletInfo
                        address={wallet?.address}
                        amount={wallet?.bnb || 0}
                    />}
            </Flex>
            <Flex w="full" flexDirection="column" py="50px">
                {children}
            </Flex>
        </Flex>
    )
}