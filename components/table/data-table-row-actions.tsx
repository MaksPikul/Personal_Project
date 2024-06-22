
import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface DataTableEditProps<TData> {
    row: Row<TData>;
    onEdit: (Value: TData) => void;

}

interface DataTableDeleteProps<TData> {
    row: Row<TData>;
    onDelete: (Value: TData) => void;
}


export const DataTableEdit = () => {

}

export const DataTableDelete = <TDdata,>({
    row, 
    onDelete
}:DataTableDeleteProps<TDdata>) => {
    
    
    return(
    <Button
    onClick={()=> onDelete(row.original)}>

    </Button>)
}