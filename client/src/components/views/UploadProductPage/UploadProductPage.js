import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';



const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key:1, value:"Nike"},
    {key:2, value:"Asics"},
    {key:3, value:"Masion Margiela"},
    {key:4, value:"Converse"},
    {key:5, value:"Vans"},
    {key:6, value:"New Balance"},
    {key:7, value:"Adidas"}
]

function UploadProductPage(props) {

    const [Title1, setTitle1] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle1(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    
    const submitHandler = (event) => {
        event.preventDefault();

        if(!Title1 || !Description || !Price || !Continent || !Image) {
            return alert("모든 값을 넣어주세요")
        }

        // 서버에 채운 값들을 request로 보낸다.

        const body = {
            // 로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title1,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        axios.post("/api/product", body)
        .then(response => {
            if(response.data.success) {
                alert("상품업로드에 성공 했습니다.")
                props.history.push('/')
            } else {
                alert("상품업로드에 실패 했습니다.")
            }
        })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>신발 상품 업로드</Title>
            </div>

            <Form onSubmit={submitHandler}>

                {/*Dropzone*/}

                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                <label>상품이름</label>
                <Input onChange={titleChangeHandler} value={Title1}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                            <option key={item.key} value={item.key}> {item.value} </option>
                    ))}               
                </select>
                <br />
                <br />
                <Button htmlType="submit">
                    submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
