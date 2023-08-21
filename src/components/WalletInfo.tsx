import { Button, HStack, Text, Image} from "@chakra-ui/react";
import React from 'react';
import { numberFormat, showSortAddress } from "@/utils";

interface IProps {
    address?: string;
    amount: number;
}

export default function WalletInfo({address, amount}: IProps) {
    return (
        <Button style={{color: "black"}} variant='outline' ml='10px'>
            <HStack>
                <Text>{showSortAddress(address)}</Text>
                <Image src='/avt.png' w='30px' alt='avt' ml='25px' />
                <Text>{numberFormat(amount)}</Text>
            </HStack>
        </Button>
    )
}