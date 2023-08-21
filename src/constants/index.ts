import { IListNFT, IMenu } from "@/_types_";


export const ListNFT: IListNFT[] = [
    {
        tokenId: "001",
        name: "Huy01",
        des: "Des of Huy01",
        price: 0.01,
        tokenURI: "URI of Huy01",
        icon: "Huy01.png"
    },
    {
        tokenId: "002",
        name: "Huy02",
        des: "Des of Huy02",
        price: 0.02,
        tokenURI: "URI of Huy02",
        icon: "Huy02.png"
    },
    {
        tokenId: "003",
        name: "Huy03",
        des: "Des of Huy03",
        price: 0.03,
        tokenURI: "URI of Huy03",
        icon: "Huy03.png"
    },
    {
        tokenId: "004",
        name: "Huy04",
        des: "Des of Huy04",
        price: 0.04,
        tokenURI: "URI of Huy04",
        icon: "Huy04.png"
    },
    {
        tokenId: "005",
        name: "Huy05",
        des: "Des of Huy05",
        price: 0.05,
        tokenURI: "URI of Huy05",
        icon: "Huy05.png"
    },
    {
        tokenId: "006",
        name: "Huy06",
        des: "Des of Huy06",
        price: 0.06,
        tokenURI: "URI of Huy06",
        icon: "Huy06.png"
    }
]

export const menus: IMenu[] = [
    { name: 'Home', url: '/' },
    { name: 'Owned', url: '/owned' },
    { name: 'Create', url: 'create' }
]