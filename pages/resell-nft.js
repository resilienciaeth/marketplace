import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext';
import { Loader, Button, Input } from '../components';

const resellNft = () => {
  const { createSale } = useContext(NFTContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
    setIsLoading(false);
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />

      </div>
    );
  }

  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);

    router.push('/');
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Vender NFT</h1>

        <Input
          inputType="number"
          title="Precio"
          placeholder="Precio del NFT"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && <img src={image} className="rounded mt-4" width={350} />}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Listear"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>

      </div>
    </div>
  );
};

export default resellNft;
