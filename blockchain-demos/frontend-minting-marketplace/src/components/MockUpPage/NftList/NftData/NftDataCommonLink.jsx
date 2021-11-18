import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import NftDataPageTest from "./NftDataPageTest";

const NftDataCommonLink = ({ currentUser, primaryColor, textColor }) => {
  // const [, /*offer*/ setOffer] = useState({});

  const [tokenData, setTokenData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState();
  const [selectedToken, setSelectedToken] = useState();
  const [offerPrice, setOfferPrice] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [productsFromOffer, setProductsFromOffer] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const params = useParams();
  const { contract, product, tokenId } = params;

  const getAllProduct = useCallback(async () => {
    const responseAllProduct = await (
      await fetch(`/api/nft/${contract}/${product}`, {
        method: "GET",
      })
    ).json();

    setTokenData(responseAllProduct.result);
    if(responseAllProduct.result.length >= Number(tokenId)){
      setSelectedData(responseAllProduct.result[tokenId].metadata);
    } 
    setSelectedToken(tokenId);
  }, [product, contract, tokenId]);

  // ---- return only offers for particular contract with x-token ----

  // const getParticularOffer = useCallback(async () => {
  //   let response = await (
  //     await fetch(`/api/contracts/${contract}/products/offers`, {
  //     // await fetch(`/api/nft/${contract}/${product}/offers`, {
  //       method: "GET",
  //       headers: {
  //         "x-rair-token": localStorage.token,
  //       },
  //     })
  //   ).json();

  //   if (response.success) {
  //     response?.products.map((patOffer) => {
  //       if (patOffer.collectionIndexInContract === Number(product)) {
  //         setOffer(patOffer);
  //         const priceOfData = patOffer?.offers.map((p) => {
  //           return p.price;
  //         });
  //         setOfferPrice(priceOfData);
  //       }
  //       return patOffer;
  //     });
  //   } else if (
  //     response?.message === "jwt expired" ||
  //     response?.message === "jwt malformed"
  //   ) {
  //     localStorage.removeItem("token");
  //   } else {
  //     console.log(response?.message);
  //   }
  // }, [product, contract]);

  // ---- return only offers for particular contract with x-token END ----

  const getParticularOffer = useCallback(async () => {
    let response = await (
      await fetch(`/api/nft/${contract}/${product}/offers`, {
        method: "GET",
      })
    ).json();

    if (response.success) {
      setOfferData(
        response.product.offers.find(
          (neededOfferIndex) =>
            neededOfferIndex.offerIndex === selectedOfferIndex
        )
      );
      setOfferPrice(
        response?.product.offers.map((p) => {
          return p.price;
        })
      );
    } else if (
      response?.message === "jwt expired" ||
      response?.message === "jwt malformed"
    ) {
      localStorage.removeItem("token");
    } else {
      console.log(response?.message);
    }
  }, [product, contract, selectedOfferIndex]);

  const getProductsFromOffer = useCallback(async () => {
    const response = await (
      await fetch(`/api/nft/${contract}/${product}/files/${tokenId}`, {
        method: "GET",
      })
    ).json();
    setProductsFromOffer(response.files);
    setSelectedOfferIndex(tokenData[tokenId]?.offer);
  }, [product, contract, tokenId]);

  //   console.log(offer, "offer!!!!");
  //   console.log(params, "@params@");

  function onSelect(id) {
    tokenData.forEach((p) => {
      if (p._id === id) {
        setSelectedData(p.metadata);
      }
    });
  }

  const handleClickToken = async (tokenId) => {
    history.push(`/tokens/${contract}/${product}/${tokenId}`);
    if(tokenData.length >= Number(tokenId)){
      setSelectedData(tokenData[tokenId].metadata);
    }
    setSelectedToken(tokenId);
  };

  useEffect(() => {
    getAllProduct();
    getParticularOffer();
    getProductsFromOffer();
  }, [getAllProduct, getParticularOffer, getProductsFromOffer]);

  return (
    <NftDataPageTest
      contract={contract}
      currentUser={currentUser}
      handleClickToken={handleClickToken}
      onSelect={onSelect}
      offerData={offerData}
      offerPrice={offerPrice}
      primaryColor={primaryColor}
      productsFromOffer={productsFromOffer}
      setSelectedToken={setSelectedToken}
      selectedData={selectedData}
      selectedToken={selectedToken}
      textColor={textColor}
      tokenData={tokenData}
      product={product}
    />
  );
};

export default NftDataCommonLink;
