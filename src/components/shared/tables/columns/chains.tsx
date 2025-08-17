import { ColumnDef } from "@tanstack/react-table";

export type chains = {
    id: string;
    chain: string;
    stableCoin: string
    allValue: string;
    nativeValue: string;
    NFTValue: string;
    totalValue: string; 
}

export const chainsColumns: ColumnDef<chains>[] = [
    {
        accessorKey: "chain",
        header: "Chain",
        cell: ({ row }) => ( <span className="text-[#D5F0FF]">{row.getValue("chain")}</span> ),
    },
    {
        accessorKey: "stableCoin",
        header: "Stablecoin ($)",
        cell: ({ row }) => ( <span className="text-[#FFD67E]">{row.getValue("stableCoin")}</span> ),
    },
    {
        accessorKey: "allValue",
        header: "Alt Value ($)",
        cell: ({ row }) => ( <span className="text-[#FE538D]">{row.getValue("allValue")}</span> ),
    },
    {
        accessorKey: "nativeValue",
        header: "Native Value ($)",
        cell: ({ row }) => ( <span className="text-[#B1BFFF]">{row.getValue("nativeValue")}</span> ),
    },
    {
        accessorKey: "NFTValue",
        header: "NFT Value ($)",
        cell: ({ row }) => ( <span className="text-[#BFFF7E]">{row.getValue("NFTValue")}</span> ),
    },
    {
        accessorKey: "totalValue",
        header: "Total Value ($)",
        cell: ({ row }) => ( <span className="text-[#7EF9FF]">{row.getValue("totalValue")}</span> ),
    },

];