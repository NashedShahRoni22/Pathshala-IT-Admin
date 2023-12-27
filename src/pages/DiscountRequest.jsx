import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function DiscountRequest() {
  const [discounts, setdiscounts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [discountId, setDiscountId] = useState("");

  const TABLE_HEAD = [
    "User Name",
    "Course Name",
    "Phone Number",
    "Status",
    "Action",
  ];

  //get discounts data
  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/discount/list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setdiscounts(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
        setDataLoading(false); // Set loading state to false when the request is complete
      }
    };

    fetchData();
  }, []);

  // approve discount
  useEffect(() => {
    if (discountId !== "") {
      setDataLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.pathshalait.com/api/v1/discount/approve/${discountId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const responseData = await response.json();

          if (responseData.status === true) {
            const filteredData = discounts.filter((d) => d.id !== discountId);
            setdiscounts(filteredData);
          } else {
            console.log(
              "Error making GET request. Status code: " + response.status
            );
          }
        } catch (error) {
          console.log("Error making GET request: " + error);
        } finally {
          setDataLoading(false);
        }
      };

      fetchData();
    }
  }, [discountId]);
  return (
    <section className="px-10 py-10">
      {dataLoading ? (
        <Loader />
      ) : (
        <>
          {discounts.length === 0 ? (
            <p className="text-3xl text-red-500 text-center mt-10 font-semibold">No discount request yet!</p>
          ) : (
            <>
              {" "}
              <h1 className="text-xl font-semibold">Discount request: {discounts?.length}</h1>
              <Card className="h-full w-full overflow-scroll mt-5">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {discounts?.map((discount, index) => {
                      const isLast = index === discounts.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {discount?.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {discount?.course_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {discount?.phone_number}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium px-2.5 py-1.5 shadow rounded capitalize w-fit bg-orange-500 text-white"
                            >
                              {discount?.status}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button
                              onClick={() => setDiscountId(discount?.id)}
                              color="blue"
                              size="sm"
                            >
                              Approve
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </>
          )}
        </>
      )}
    </section>
  );
}
