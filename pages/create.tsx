import { Button, Input } from '@chakra-ui/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const Create = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        setImage(selectedImage || null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Thực hiện xử lý gửi thông tin NFT (name, description, image) lên server tại đây
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Input placeholder='Enter your NFT name' />
                </div>
                <div>
                    <Input mt="20px" mb="20px" placeholder='Enter your NFT description' size='lg' />
                </div>
                <div>
                    <label>Attach your NFT image:</label>
                    <input style={{ marginLeft: "15px" }} type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <Button style={{ backgroundColor: "rgba(52, 255, 224, 1)" }} variant="outline" mt="50px" type="submit">Create</Button>
            </form>
        </div >
    );
};

export default Create;
