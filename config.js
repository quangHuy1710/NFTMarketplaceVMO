// API Key: 144a4f74ebe4440b1ef7
//  API Secret: 935c5a2ec292b399e959377704b00ddce7a6e6592d4a84372f54fa655621b6bb
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNTJhOWNlMC04Y2JjLTQ1MjctOWRlZS00MmRlNDQ1N2U1NDAiLCJlbWFpbCI6InF1YW5naHV5NjE2MTYxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNDRhNGY3NGViZTQ0NDBiMWVmNyIsInNjb3BlZEtleVNlY3JldCI6IjkzNWM1YTJlYzI5MmIzOTllOTU5Mzc3NzA0YjAwZGRjZTdhNmU2NTkyZDRhODQzNzJmNTRmYTY1NTYyMWI2YmIiLCJpYXQiOjE2OTMzMjIxMTJ9.-ooCUySefbGnouKNWHjMhExhP0GsJ-tvIYAMxfPJ-1g

export const nftAddress = "0xecb4a6dFEA267BBd8fEd3FB6172289c41ccB6BE0"
export const nftMarketAddress = "0xb947c3B03527B37f6510b3294890E940ffcf70f9"

//Gateway

export const apikey = '144a4f74ebe4440b1ef7';
export const apisecret = '935c5a2ec292b399e959377704b00ddce7a6e6592d4a84372f54fa655621b6bb';
export const gateWayjwt = 'cHgTNkKDf1mnrx3DPam9iYF-GzeR4b_T_oqMl9Qfma72dSNHoaUQS5pNK0TtS91g';
export const ipfsgateWay = 'rose-active-guineafowl-319';

export const readHeader = {
    'Content-Type': 'application/json',
}

export const getHeader = {
    Headers: {
        pinata_api_key: apikey,
        pinata_secret_api_key: apisecret,
    }
}

export const sendJsonHeader = {
    headers: {
        'Content-Type': 'application/json',
        pinata_api_key: apikey,
        pinata_secret_api_key: apisecret,
    }
}