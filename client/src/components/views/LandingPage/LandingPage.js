import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import  CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from  './Sections/Datas';


function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState(0)
  const [Filters, setFilters] = useState({
      continents: [],
      price: []
  })

  useEffect(() => {

    let body = {
        skip: Skip,
        limit: Limit
    }

    getProducts(body)

  }, [])

  const getProducts = (body) => {

    axios.post("/api/product/products", body)
    .then(response => {
      if (response.data.success) {
          if(body.loadMore) {
            setProducts([...Products, ...response.data.productInfo])
          } else {
            setProducts(response.data.productInfo)
          }
          setPostSize(response.data.postSize)
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    })
  }

  const loadMoreHandler = () => {

    let skip = Skip + Limit // 0 + 8

    let body = {
        skip: skip,
        limit: Limit,
        loadMore: true
    }

    getProducts(body)

    setSkip(skip)
  }

  const renderCards = Products.map((product, index) => {
    return <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={<ImageSlider images={product.images}/>}
        >
          <Meta 
            title={product.title} 
            description={`$${product.price}`} />
        </Card>
      </Col> 
  })

  const showFilterResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
      getProducts(body)
      setSkip(0)
  }

  const handleFilters = (filters, category) => {
      const newFilters = {...Filters}

      newFilters[category] = filters

      showFilterResults(newFilters)
  }

  return (
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Shoes Mall
            <Icon type="shopping" />
          </h2>
        </div>
        <br />
        {/* Filter */}
          <Row gutter={[16, 16]}>
              <Col lg={12} xs={24}>
              {/* CheckBox */}
                <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
              </Col>
              <Col lg={12} xs={24}>
              {/*  RadioBox */}
                <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
              </Col>
            </Row>
        <br />
        


        {/* Search */}


        {/* Cards */}

        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />
        {PostSize >= Limit &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={loadMoreHandler}>더보기</Button>
            </div>
        }
        

      </div>
  );
}

export default LandingPage;
