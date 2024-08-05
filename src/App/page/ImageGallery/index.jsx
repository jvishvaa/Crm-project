import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Pagination,
  Row,
  Select,
  Spin,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../component/UtilComponents/CustomCard";

const ImageGallery = () => {
  const [form] = useForm();
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const getImages = () => {
    setLoading(true);
    setTimeout(() => {
      let list = [
        {
          id: 620419,
          address:
            "834Q+H87, Saran Nagar, Jodhpur, Jodhpur Division, Rajasthan, 342006, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/tguypscaled_f494041b-35ad-4d8e-aab4-28e48816d80a6338860587227110245.jpg",
          created_date: "2024-08-05T11:36:09.881745",
          user: 51458,
          first_name: "Pushpendra choudhary ",
          latitude: "26.3066343",
          longitude: "73.0880962",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Saran Nagar",
        },
        {
          id: 620418,
          address:
            "4WHM+P6R, Kanjurmarg East, Mumbai, Konkan Division, Maharashtra, 400042, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/kyjuiscaled_cace9493-09b2-46af-996b-e1755d2e37ea3733966637401739196.jpg",
          created_date: "2024-08-05T11:12:27.199309",
          user: 51838,
          first_name: "Kartik Sairam Datta",
          latitude: "19.12937355041504",
          longitude: "72.93302154541016",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Vikhroli",
        },
        {
          id: 620417,
          address:
            "BWSSB Bill Payment Kiosk, Kengeri Satellite Town, Bengaluru, Bangalore Division, Karnataka, 560060, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/uuwvoscaled_65ac95da-1dca-4e21-8bfe-c68a1cdf0878587739339365514000.jpg",
          created_date: "2024-08-05T10:54:46.100449",
          user: 15070,
          first_name: "Andani MS  EVent",
          latitude: "12.9232117",
          longitude: "77.4833702",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Mysore Road",
        },
        {
          id: 620416,
          address:
            "Eros Cooperative Housing Society, Zingabai Takli, Nagpur, Nagpur Division, Maharashtra, 440030, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/lqtbtscaled_9aa91586-663a-480b-a1f7-3bcf0e9c3a04818528707747282704.jpg",
          created_date: "2024-08-05T10:53:16.333865",
          user: 49620,
          first_name: "Pooja Pramod Bangale",
          latitude: "21.1970117",
          longitude: "79.0700648",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Koradi Road",
        },
        {
          id: 620415,
          address:
            "9589+X8P, Jajiwal Kallan, Jajiwal Dhandhal, Jodhpur Division, Rajasthan, 342027, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/iuejxscaled_cda3a647-424a-4d18-bd9a-a799c92c8a218978434037842113548.jpg",
          created_date: "2024-08-05T10:38:10.806732",
          user: 49814,
          first_name: "suresh choudhary",
          latitude: "26.3667753",
          longitude: "73.1682374",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Saran Nagar",
        },
        {
          id: 620414,
          address:
            "43/1, Banaswadi, Bengaluru, Bangalore Division, Karnataka, 560043, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/znrogscaled_8598e8c2-3faf-4938-861c-a8107b17de724747191342482933423.jpg",
          created_date: "2024-08-05T10:31:44.548746",
          user: 50490,
          first_name: "Terence Joseph",
          latitude: "13.0139806",
          longitude: "77.642678",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Horamavu",
        },
        {
          id: 620413,
          address:
            "Orchids The International School, Thane West, Mumbai, Konkan Division, Maharashtra, 400607, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/phsfzscaled_d2a022af-9e9e-4ab0-bc42-d85c7def43f8835969520598231404.jpg",
          created_date: "2024-08-05T10:25:36.138387",
          user: 43669,
          first_name: "Chetana Narendra Kadu",
          latitude: "19.2418678",
          longitude: "72.9827987",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Thane",
        },
        {
          id: 620412,
          address:
            "3, BJS Colony, Jodhpur, Jodhpur Division, Rajasthan, 342006, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/xdikwscaled_fc044f6c-e8ae-4894-8407-dd1abe7e293b2974048457976282575.jpg",
          created_date: "2024-08-05T10:23:31.915108",
          user: 51087,
          first_name: "Bhavesh luniya",
          latitude: "26.3068212",
          longitude: "73.0660912",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Saran Nagar",
        },
        {
          id: 620411,
          address:
            "4FRQ+4PM, Ratanpur Sadak, Bhopal, Bhopal Division, Madhya Pradesh, 462047, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/yytvtscaled_6b18ed83-6c13-4bcd-84e8-6acb5a6556b25080645709001890265.jpg",
          created_date: "2024-08-05T10:21:59.179898",
          user: 47326,
          first_name: "Rahul Rajak",
          latitude: "23.1397139",
          longitude: "77.488042",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Hoshangabad Road",
        },
        {
          id: 620410,
          address:
            "10, MMRDA Colony Rd, MMRDA Colony, Ambedkar Nagar, Kanjurmarg West, Bhandup West, Mumbai, Maharashtra 400078, India,Mumbai,Maharashtra,India,400078",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/odbdwW922PUNGRG.png",
          created_date: "2024-08-05T10:20:07.476285",
          user: 15473,
          first_name: "Divya Ravindra Salunke",
          latitude: "19.1319857",
          longitude: "72.9291666",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Vikhroli",
        },
        {
          id: 620409,
          address:
            "222, Naurbad, Raypur, Presidency Division, West Bengal, 700104, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/yjdxuscaled_8288eb73-3e59-46bf-a4cd-bab802096a774485897412977527965.jpg",
          created_date: "2024-08-05T10:15:26.330515",
          user: 51495,
          first_name: "Maharudra Das ",
          latitude: "22.4371128",
          longitude: "88.2781426",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Joka",
        },
        {
          id: 620408,
          address:
            "5, Seawoods, Navi Mumbai, Konkan Division, Maharashtra, 400706, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/fpmpqscaled_8b0d5c8c-7015-4536-b4cf-019c0d896cfd3948263962880943345.jpg",
          created_date: "2024-08-05T10:14:19.150469",
          user: 23174,
          first_name: "Swati Pramod Mishra",
          latitude: "19.0215395",
          longitude: "73.0137428",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Koparkhairane Sector 14",
        },
        {
          id: 620407,
          address:
            "Unnamed Road, Jaisinghpura, Bhankrota, Jaipur Division, Rajasthan, 302029, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/jlnmxscaled_33cb898a-635e-4199-8f17-f5b4f3ae100f7094912801443004190.jpg",
          created_date: "2024-08-05T10:11:53.017592",
          user: 51268,
          first_name: "Sachin Chironjiya",
          latitude: "26.8217946",
          longitude: "75.6752605",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Nevta",
        },
        {
          id: 620406,
          address:
            "22, Kopar Khairane, Navi Mumbai, Konkan Division, Maharashtra, 400709, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/zkacescaled_197f885c-3b4e-4ffa-ab4f-5a98120004134688312675412411853.jpg",
          created_date: "2024-08-05T10:11:40.099192",
          user: 39807,
          first_name: "Vikas Babasaheb Kokate  Event",
          latitude: "19.0978941",
          longitude: "73.0015482",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Koparkhairane",
        },
        {
          id: 620405,
          address:
            "Unnamed Road, , Rohtak, Rohtak Division, Haryana, 124001, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/hvpcyscaled_ad8dcf60-8b50-433b-98f4-57e6c8361a513715129743345646867.jpg",
          created_date: "2024-08-05T10:09:01.760769",
          user: 50321,
          first_name: "Rahul Hooda",
          latitude: "28.9618324",
          longitude: "76.6128872",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Gohana Road",
        },
        {
          id: 620404,
          address:
            "5, Mahadevapura, Bengaluru, Bangalore Division, Karnataka, 560016, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/ngwdzscaled_522735e0-1859-4e27-b1f7-4148404ee4ef1638054264110307846.jpg",
          created_date: "2024-08-05T10:07:14.967788",
          user: 17746,
          first_name: "Sujimitha M",
          latitude: "12.9921573",
          longitude: "77.6802341",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS CV Raman Nagar",
        },
        {
          id: 620403,
          address:
            "11, Mulund West, Mumbai, Konkan Division, Maharashtra, 400080, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/rmfkmscaled_91fb97d2-59e5-4681-b865-467b74be77045630000585063907571.jpg",
          created_date: "2024-08-05T10:04:39.474377",
          user: 42088,
          first_name: "Shreyas Dattatray Shigvan",
          latitude: "19.1786551",
          longitude: "72.9512105",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Mulund East",
        },
        {
          id: 620402,
          address:
            "DY Patil Dental College, Bhosari, Pimpri-Chinchwad, Pune Division, Maharashtra, 411018, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/cfzgescaled_a2f2c5f6-530d-4c73-901e-17c6abf87b825404392642412828581.jpg",
          created_date: "2024-08-05T10:03:00.283460",
          user: 17778,
          first_name: "Sangita Nitin Khade",
          latitude: "18.6246589",
          longitude: "73.8230962",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Nigdi",
        },
        {
          id: 620401,
          address:
            "Shop no 1, Dombivli East, Dombivli, Konkan Division, Maharashtra, 421201, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/txrexscaled_b730f993-239d-40b2-a4be-4aec59d709571886272281466811808.jpg",
          created_date: "2024-08-05T10:02:58.261028",
          user: 45976,
          first_name: "Marmik Satish Dhamecha",
          latitude: "19.2089481",
          longitude: "73.0893163",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Dombivali",
        },
        {
          id: 620400,
          address:
            "4RJ9+37W, Andheri West, Mumbai, Konkan Division, Maharashtra, 400061, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/bmjwjscaled_689b0fda-e2d5-4619-8eb6-c786252750b6632808660990427890.jpg",
          created_date: "2024-08-05T10:01:29.459226",
          user: 51371,
          first_name: "sunny kumar",
          latitude: "19.1301988",
          longitude: "72.8182882",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Yari Road",
        },
        {
          id: 620399,
          address:
            "BUILDING-5, Kopar Khairane, Navi Mumbai, Konkan Division, Maharashtra, 400709, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/fccapscaled_9c6fe365-e2cd-4d0e-bc09-424317f38b842403350805744211819.jpg",
          created_date: "2024-08-05T09:59:20.409342",
          user: 15590,
          first_name: "Kumari Mamta",
          latitude: "19.0976528",
          longitude: "73.0013885",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Koparkhairane Sector 14",
        },
        {
          id: 620398,
          address:
            "A-16, Sion, Mumbai, Konkan Division, Maharashtra, 400022, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/hcscy516ecb8c-d0a7-47ee-b00a-979b8634252d9138362542684768623.jpg",
          created_date: "2024-08-05T09:58:36.172829",
          user: 46081,
          first_name: "Vikas Sukharam Kesari",
          latitude: "19.0421353",
          longitude: "72.8723989",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Sion",
        },
        {
          id: 620397,
          address:
            "24, Police Linetakli, Nagpur, Nagpur Division, Maharashtra, 440013, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/syslgscaled_5106e294-a486-4c6d-80dc-70ab2958c2c28648127313672066786.jpg",
          created_date: "2024-08-05T09:54:53.785745",
          user: 49659,
          first_name: "Diksha Ashok Ingle  Event",
          latitude: "21.1815431",
          longitude: "79.0696917",
          selfie_violation: false,
          dress_code: false,
          branch: "ORCHIDS Koradi Road",
        },
        {
          id: 620396,
          address:
            "Block-24, Kadugodi, Bengaluru, Bangalore Division, Karnataka, 560067, India",
          image:
            "https://storage.googleapis.com/letseduvate-marketing/prod/Orchids/tjgszscaled_9da39e51-3023-4a8f-bb38-119f4d51c8102779870705930177256.jpg",
          created_date: "2024-08-05T09:54:09.760136",
          user: 50159,
          first_name: "Pavithra",
          latitude: "12.9969515",
          longitude: "77.7629607",
          selfie_violation: false,
          dress_code: false,
          branch: "Pragathi ORCHIDS Whitefield",
        },
      ];
      setPagination({
        current: 1,
        pageSize: 24,
        total: 24,
      });
      setImages(list);
      setLoading(false);
    }, 3000);
  };
  return (
    <CustomCard>
      <Row gutter={[8, 0]}>
        <Col span={24}>
          <Row className="d-flex flex-column">
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Image Gallery"]} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24} style={{ marginTop: -10 }}>
          <Spin spinning={loading} tip="Loading">
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={() => {
                    getImages();
                  }}
                >
                  <Row gutter={[8, 8]}>
                    <Col xs={12} sm={8} xl={6}>
                      <Form.Item
                        className="w-100"
                        name="is_active"
                        label="Branch"
                      >
                        <Select
                          className="w-100"
                          // onChange={() => {
                          //   handleOnChange();
                          // }}
                          options={[
                            {
                              value: 0,
                              label: "Bangalore",
                            },
                            {
                              value: true,
                              label: "Delhi",
                            },
                            {
                              value: false,
                              label: "Mumbai",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={8} xl={6}>
                      <Form.Item className="w-100" name="date" label="Date">
                        <DatePicker className="w-100" />
                      </Form.Item>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-end">
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Get
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Spin>
        </Col>
        <Row gutter={[16, 16]} className="mt-3">
          {images?.map((image) => (
            <Col key={image?.id} xs={12} sm={8} md={4} lg={2} xl={2}>
              <div className="h-100 image-gallery">
                <Image width="100%" className="h-100" src={image?.image} />
              </div>
            </Col>
          ))}
        </Row>
        {images?.length > 0 && (
          <div className="d-flex justify-content-center w-100 mt-3">
            <Pagination
              current={pagination?.current}
              pageSize={pagination?.pageSize}
              total={pagination?.total}
              // onChange={handlePageChange}
            />
          </div>
        )}
      </Row>
    </CustomCard>
  );
};

export default ImageGallery;
