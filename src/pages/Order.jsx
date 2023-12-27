import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [approveId, setApproveId] = useState("");

  const TABLE_HEAD = [
    "User Name",
    "Course Name",
    "Amount",
    "Method",
    "Transection Id",
    "Transection Number",
    "Action",
  ];

  //get orders data
  useEffect(() => {
    setDataLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/order/course",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setOrders(responseData?.data);
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
  }, []);

  // approve order
  useEffect(() => {
    if (approveId !== "") {
      setDataLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.pathshalait.com/api/v1/order/course/approve/${approveId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const responseData = await response.json();
          console.log(responseData);

          if (responseData.status === true) {
            const filteredData = orders.filter((d) => d.id !== approveId);
            setOrders(filteredData);
          } else {
            console.log(responseData);
          }
        } catch (error) {
          console.log("Error making GET request: " + error);
        } finally {
          setDataLoading(false);
        }
      };

      fetchData();
    }
  }, [approveId]);

  return (
    <section className="px-10 py-10">
      {dataLoading ? (
        <Loader />
      ) : (
        <>
          {orders?.length === 0 ? (
            <p className="text-3xl text-red-500 text-center mt-10 font-semibold">No enrollment request yet!</p>
          ) : (
            <>
              <h1 className="text-xl font-semibold">Enrollment request: {orders?.length}</h1>
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
                    {orders?.map((order, index) => {
                      const isLast = index === orders.length - 1;
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
                              {order?.user_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {order?.course_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {order?.payments?.amount}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {order?.payments?.payment_method}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {order?.payments?.transaction_id}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {order?.payments?.transaction_number}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button
                              onClick={() => setApproveId(order?.id)}
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
