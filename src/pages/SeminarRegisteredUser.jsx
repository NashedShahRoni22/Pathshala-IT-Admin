import {
  Button,
  Card,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SeminarRegisteredUser() {
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [registeredUser, setRegisteredUser] = useState([]);
  console.log(registeredUser);
  const [postLoading, setPostLoading] = useState(false);

  const TABLE_HEAD = ["Name", "Email", "Phone", "Address", "Status", "Action"];

  // get data
  useEffect(() => {
    // setDataLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.pathshalait.com/api/v1/seminars/registration/list/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setRegisteredUser(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      } finally {
        // setDataLoading(false);
      }
    };

    fetchData();
  }, [postLoading]);

  //handle update status
  const handleUpdateStatus = async (status, id) => {
    const formData = new FormData();
    formData.append("status", status);
    formData.append("remarks", "test");
    try {
      setPostLoading(true);
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await fetch(
        `https://api.pathshalait.com/api/v1/seminars/registration/review/submit/${id}`,
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        // window.alert("Status updated");
      } else {
        console.log(
          "Error making POST request. Status code: " + response.status
        );
      }
    } catch (error) {
      console.log("Error making POST request: " + error);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <section className="px-10 py-20">
      {registeredUser.length === 0 ? (
        <div className="mt-5">
          <p className="text-red-500 text-3xl text-center font-semibold">
            No Student Yet!
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-semibold">
            Registered students {registeredUser.length}
          </h1>
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
                {registeredUser.map((s, index) => {
                  const isLast = index === registeredUser.length - 1;
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
                          {s?.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {s?.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {s?.phone_number}
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
                          {s?.address}
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
                          {s?.status === "approved" && (
                            <p className="capitalize text-green-500">
                              approved
                            </p>
                          )}
                          {s?.status === "denied" && (
                            <p className="capitalize text-red-500">denied</p>
                          )}
                          {s?.status === "pending" && (
                            <p className="capitalize text-blue-500">pending</p>
                          )}
                        </Typography>
                      </td>
                      {s?.status === "pending" && (
                        <td className={classes}>
                          <Popover placement="bottom">
                            <PopoverHandler>
                              <Button size="sm" className="bg-blue-500">
                                Update
                              </Button>
                            </PopoverHandler>
                            <PopoverContent className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleUpdateStatus("approved", s?.id)
                                }
                                className="bg-green-500"
                              >
                                Approved
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleUpdateStatus("denied", s?.id)
                                }
                                className="bg-red-500"
                              >
                                Deny
                              </Button>
                            </PopoverContent>
                          </Popover>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </section>
  );
}
