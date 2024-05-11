import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { nanoid } from "nanoid";
import { useState } from "react";
import IconButton from "./components/IconButton";
function App() {
  const shops = [
    {
      id: 1,
      name: "Migros",
    },
    {
      id: 2,
      name: "Bim",
    },
    {
      id: 3,
      name: "Teknosa",
    },
  ];
  const categories = [
    { id: 1, name: "Elektronik" },
    { id: 2, name: "Şarküteri" },
    { id: 3, name: "Oyuncak" },
    { id: 4, name: "Bakliyat" },
    { id: 5, name: "Fırın" },
    { id: 6, name: "Kırtasiye" },
  ];
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [productShop, setproductShop] = useState("");
  const [productCategory, setproductCategory] = useState("");

  const addShop = () => {
    const productName = input;
    const product = {
      id: nanoid(),
      name: productName,
      shop: productShop,
      category: productCategory,
    };
    setProducts([...products, product]);
    setInput("");
  };

  return (
    <>
      <Container className="my-5 px-5">
        <h1 className="text-center my-5">Market Listesi</h1>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Listeye ürün ekle"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <Form.Select
            style={{ maxWidth: "200px" }}
            value={productCategory}
            onChange={(e) => setproductCategory(e.target.value)}
          >
            <option>Kategori seçiniz</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{ maxWidth: "200px" }}
            value={productShop}
            onChange={(e) => setproductShop(e.target.value)}
          >
            <option>Market seçiniz</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Button variant="outline-secondary" onClick={addShop}>
            Ekle
          </Button>
        </InputGroup>
        <div>
          <Table striped bordered className="mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category Name</th>
                <th>Shop Name</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    const newProducts = products.map((oldProduct) => {
                      if (oldProduct.id === product.id) {
                        return { ...oldProduct, isBought: true };
                      } else {
                        return oldProduct;
                      }
                    });
                    if (newProducts.every((uP) => !!uP.isBought)) {
                      alert("Alışveriş tamamlandı");
                    }
                    setProducts(newProducts);
                  }}
                  style={
                    product.isBought ? { textDecoration: "line-through" } : {}
                  }
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.shop}</td>
                  <td>
                    <IconButton
                      handleClick={() => {
                        setProducts(
                          products.filter(
                            (filterProduct) => filterProduct.id !== product.id
                          )
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default App;
