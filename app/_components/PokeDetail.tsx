import { PokeDetailType } from "@/models/poke-detail.model";
import { Modal } from "@mantine/core";
import Image from "next/image";
import { Button } from '@mantine/core';

type Props = {
    visible: boolean;
    detail?: PokeDetailType;
    onClose: () => void;
}

const PokeDetail: React.FC<Props> = ({ visible, detail, onClose }) =>{
    return (
        <Modal opened={visible} onClose={onClose} title="Pokemon Information">
            {/* Modal content */}
            {
                detail && 
                <div>
                    <div className="flex flex-col items-center gap-y-2">
                        <span className="font-bold text-[20px] text-blue-400">{ detail.name }</span>
                        <Image src={detail.sprites.other["official-artwork"].front_default} alt={detail.name} width={96} height={96} />
                        <span className="text-[16px] text-gray-400">More descriptions...</span>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="filled" color="gray" onClick={onClose}>Close</Button>
                    </div>
                </div>
            }
        </Modal>
    )
}

export default PokeDetail;