import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface IProps extends ButtonProps {}
export default function ConnectWallet({ ...props }: IProps) {
  return (
    <Button variants="primary" {...props} style={{ background: '#fedf56eb' }}>
      Connect Wallet
    </Button>
  );
}