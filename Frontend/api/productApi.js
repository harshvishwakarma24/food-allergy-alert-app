import axios from "axios";

export const getProductByBarcode = async (barcode) => {
  try {
    console.log("FETCHING PRODUCT FOR BARCODE:", barcode);

    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    const data = await response.json();

    console.log("OPENFOODFACTS RESPONSE:", data);

    return data;
  } catch (error) {
    console.log("PRODUCT API ERROR:", error);
    return null;
  }
};


