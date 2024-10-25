'use client'

import { PagingBody } from "@/models/paging-model";
import { PokeDetailRetrieved, PokeDetailType } from "@/models/poke-detail.model";
import { PokeTypeDetail, PokeTypePaging, PokeTypeResult } from "@/models/poke-type.model";
import { PokePaging, PokeResult } from "@/models/poke.model";
import pokeServices from "@/services/poke.service";
import { LoadingOverlay, Pagination, ScrollArea, Table } from '@mantine/core';
import Image from "next/image";
import { useEffect, useState } from "react";
import PokeDetail from "./PokeDetail";
import { Button } from '@mantine/core';

type Props = {
    data: PokePaging;
    type: PokeTypePaging;
    typeDetails: PokeTypeDetail[];
}

const PokeTable: React.FC<Props> = ({ data, type, typeDetails }) =>{
    const [paging, setPaging] = useState<PagingBody>({
        pageIndex: 0,
        pageSize: 48,
        typeFilters: []
    });
    // data from cache
    const [pokeRetreived, setPokeRetreived] = useState<PokeDetailRetrieved>({data: []});

    // data view
    const [pokeDetails, setPokeDetails] = useState<PokeDetailType[]>([]);
    const [pokeDetailView, setPokeDetailView] = useState<PokeDetailType | undefined>(undefined);
    const [pokeDetailVisible, setPokeDetailVisible] = useState<boolean>(false);
    // current pokemon
    const [currentPoke, setCurrentPoke] = useState<PokeResult[]>([]);
    const [totalRecord, setTotalRecord] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    // lấy data query từ paging và filter condition
    useEffect(() =>{
        const { pageIndex, pageSize, typeFilters } = paging;
        const start = pageIndex * pageSize;
        const end = start + pageSize;

        if(typeFilters.length === 0){
            setCurrentPoke(data.results.slice(start, end).map(x => ({name: x.name, url: x.url})));
            setTotalRecord(data.results.length);
            return;
        }
        const _items: PokeResult[] = typeDetails.filter(x => typeFilters.includes(x.name)).map(x => x.pokemon.map(y => ({name: y.pokemon.name, url: y.pokemon.url}))).flat();
        if(typeFilters.length === 1){
            setCurrentPoke(_items.slice(start, end));
            setTotalRecord(_items.length);
            return;
        }
        const _duplicates = findDuplicates(_items, typeFilters.length - 1);
        setCurrentPoke(_duplicates.slice(start, end));
        setTotalRecord(_duplicates.length);
    }, [paging, typeDetails, data]);

    // lấy data chi tiết của pokemon
    useEffect(() =>{
        const fetchPokeDetails = async () => {
            const _itemCaches = pokeRetreived.data.filter(x => currentPoke.some(c => c.name === x.name));
            if(_itemCaches.length === currentPoke.length){
                setPokeDetails(_itemCaches);
                return;
            }

            let _urls: string[] = [];
            if(_itemCaches.length === 0){
                _urls = currentPoke.map(x => x.url);
            }else{
                const _items = currentPoke.filter(x => !_itemCaches.some(c => c.name === x.name));
                _urls = _items.map(x => x.url);
            }

            setLoading(true);
            const details = await Promise.all(_urls.map(async (url) => {
                return await pokeServices.getPokeDetailByUrl(url);
            }))
            setPokeDetails(prev => [...prev, ...details]);
            setPokeRetreived(prev => ({data: [...prev.data, ...details]}));
            setLoading(false);
        }
        fetchPokeDetails();
    }, [currentPoke, pokeRetreived]);

    const findDuplicates = (data: PokeResult[], time: number): PokeResult[] =>{
        // Đếm số lần xuất hiện của mỗi giá trị dựa trên thuộc tính `key`
        const countMap = data.reduce((acc, obj) => {
            const keyValue = obj.name;
            acc[keyValue] = (acc[keyValue] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Lọc các object có giá trị của `key` xuất hiện nhiều hơn 1 lần
        return data.filter((obj, index, self) => countMap[obj.name] > time && index === self.findIndex(o => o.name === obj.name));
    }

    const rows = pokeDetails.map((poke) => (
        <Table.Tr key={poke.id}>
            <Table.Td>{poke.name}</Table.Td>
            <Table.Td>
                <Image src={poke.sprites.other["official-artwork"].front_default} alt={poke.name} width={96} height={96} loading="lazy" />
            </Table.Td>
            <Table.Td>
                <Button variant="filled" onClick={() => {setPokeDetailVisible(true); setPokeDetailView(poke)}}>Info</Button>
            </Table.Td>
        </Table.Tr>
    ));

    const handleChangePageIndex = (page: number) => {
        setPaging(prev => ({...prev, pageIndex: page - 1}));
    }

    const handleSelectType = (type: PokeTypeResult) =>{
        if(paging.typeFilters.includes(type.name)){
            setPaging(prev => ({...prev, pageIndex: 0, typeFilters: prev.typeFilters.filter(x => x !== type.name)}));
        }else{
            setPaging(prev => ({...prev, pageIndex: 0, typeFilters: [...prev.typeFilters, type.name]}));
        }
    }

    return (
        <div className="pt-4">
            <div className="flex flex-wrap gap-2">
                {
                    type.results.map((t) => (
                        <button type="button" key={t.name} className={`cursor-pointer text-white font-bold px-2 rounded ${paging.typeFilters.includes(t.name) ? 'bg-blue-400' : 'bg-slate-400'}`} onClick={() => handleSelectType(t)}>
                            { t.name }
                        </button>
                    ))
                }
            </div>
            {
                totalRecord === 0 ?
                <div>
                    <span className="block mt-4 text-center font-bold text-[20px]">No result found.</span>
                </div> :
                <div>
                    <div className="my-2">
                        <span className="font-bold text-[18px]">{totalRecord} results found.</span>
                    </div>
                        <ScrollArea className="h-[70vh] md:h-[75vh]">
                            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                            <Table striped highlightOnHover >
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Image</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{rows}</Table.Tbody>
                            </Table>
                        </ScrollArea>
                    <div className="flex justify-end mt-2">
                        <Pagination disabled={loading} total={Math.ceil(totalRecord / paging.pageSize)} value={paging.pageIndex + 1} onChange={handleChangePageIndex} />
                    </div>
                </div>
            }
            <PokeDetail visible={pokeDetailVisible} detail={pokeDetailView} onClose={() => setPokeDetailVisible(false)} />
        </div>
    )
}

export default PokeTable;