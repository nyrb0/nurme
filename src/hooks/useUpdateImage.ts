import { ChangeEvent, useCallback, useState } from 'react';

type imageType = {
    storageImage: string | null;
    changeImage: (e: ChangeEvent<HTMLInputElement>) => void;
};

const useUpdate = (): imageType => {
    const [storageImage, setStorageImage] = useState<string | null>('');

    const changeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStorageImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    return {
        changeImage,
        storageImage,
    };
};

export default useUpdate;
