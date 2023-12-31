import React, { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

interface IItemFilterProps<T> {
    originalList: T[];
    setFilteredList: React.Dispatch<React.SetStateAction<T[]>>;
    filterFields: (keyof T)[];
    placeHolder?: string;
    style?: React.CSSProperties;
}

const ItemFilter = <T extends unknown>({ originalList, setFilteredList, filterFields, placeHolder, style }: IItemFilterProps<T>) => {

    useEffect(() => updateFilter(undefined), [originalList]);

    const updateFilter = (value: any) => {
        if (!value) {
            setFilteredList(originalList);
        } else {
            setFilteredList(originalList.filter(x => 
                filterFields.find(f => {
                    return (x[f] as any).toString().toLowerCase().includes(value.toLowerCase());
                })
            ));
        }
    };

    return (
        <div style={{float: "left", marginBottom: "10px"}}>
        <InputGroup style={style}>
            <Form.Control style={{marginBottom: "10px", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "5px"}} placeholder={placeHolder ?? 'Buscar...'} onChange={e => updateFilter(e.currentTarget.value)}/>
            <InputGroup.Text><AiOutlineSearch /></InputGroup.Text>
        </InputGroup>
        </div>
    );
}

export default ItemFilter;