import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import BannerServiceObj from "../banner/banner.service";
import { FaTrash } from "react-icons/fa";

export const HomePageBanner = () => {
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]);

  const getBannerData = async () => {
    try {
      let response = await BannerServiceObj.getBannerForHomePage();
      //   console.log(response.data.data);
      setBannerData(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="nav-margin">Loading...</div>
      ) : (
        <>
          <Container className="nav-margin mt-3">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bannerData &&
                  bannerData.map((data, index) => (
                    <tr>
                      <td>{data._id}</td>
                      <td>{data.title}</td>
                      <td>{data.image}</td>
                      <td>{data.status}</td>
                      <td>
                        <FaTrash />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
};
