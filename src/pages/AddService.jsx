import {
  Input,
  Option,
  Select,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiFillEye } from "react-icons/ai";

export default function AddService() {
  // get data
  const accessToken = localStorage.getItem("accessToken");
  const [postLoading, setPostLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // dialogue management
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(!open2);
  //data management
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [categoreyId, setCategoreyId] = useState("");
  const [courseType, setCourseType] = useState("");
  const [discountAmount, setdiscountAmount] = useState("");
  const [opportunitie1, setopportunitie1] = useState("");
  const [opportunitie2, setopportunitie2] = useState("");

  //features management
  const [basic, setBasic] = useState(false);
  const [standard, setStandard] = useState(false);
  const [premium, setPremium] = useState(false);

  // curriculum
  const [curriculum, setCurriculum] = React.useState("");
  const [curriculums, setCurriculums] = React.useState("");
  const onCurriculumChange = ({ target }) => setCurriculum(target.value);
  const addCurriculums = () => {
    const newsetCurriculums = [...curriculums, curriculum];
    setCurriculums(newsetCurriculums);
    setCurriculum("");
  };
  const removeCurriculum = (index) => {
    const updatedCurriculums = [...curriculums];
    updatedCurriculums.splice(index, 1);
    setCurriculums(updatedCurriculums);
  };

  // position
  const [position, setPosition] = React.useState("");
  const [positions, setPositions] = React.useState("");
  const onPositionChange = ({ target }) => setPosition(target.value);
  const addPositions = () => {
    const newsetPositions = [...positions, position];
    setPositions(newsetPositions);
    setPosition("");
  };
  const removePosition = (index) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  };

  //software
  const [softwares, setSoftwares] = React.useState([]);
  const softwaresId = softwares.map((item) => item.id);

  const handleSoftware = (value) => {
    // Check if the value is not empty and not already selected
    if (value && !softwares.includes(value)) {
      setSoftwares([...softwares, value]);
      // setSubSpecialityId(""); // Clear the input after selection
    }
  };
  const removeSoftware = (value) => {
    const software = softwares.filter((software) => software !== value);
    setSoftwares(software);
  };

  //profession
  const [professions, setProfessions] = React.useState([]);
  const professionsId = professions.map((item) => item.id);

  const handleProfession = (value) => {
    // Check if the value is not empty and not already selected
    if (value && !professions.includes(value)) {
      setProfessions([...professions, value]);
      // setSubSpecialityId(""); // Clear the input after selection
    }
  };
  const removeProfession = (value) => {
    const profession = professions.filter((profession) => profession !== value);
    setProfessions(profession);
  };

  //get categories
  useEffect(() => {
    // Only call the API when accessToken is available and loading is true
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/categories",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setCategories(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      }
    };

    fetchData();
  }, []);
  // get tools
  useEffect(() => {
    // Only call the API when accessToken is available and loading is true
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.pathshalait.com/api/v1/tools",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setTools(responseData?.data);
        } else {
          console.log(
            "Error making GET request. Status code: " + response.status
          );
        }
      } catch (error) {
        console.log("Error making GET request: " + error);
      }
    };

    fetchData();
  }, []);

  //add course
  const handleAddCourse = async () => {
    const formData = new FormData();
    const mergedTools = [...softwaresId, ...professionsId];
    const postData = {
      image,
      name,
      categoreyId,
      courseType,
      slogan,
      onlineFee,
      offlineFee,
      discountAmount,
      // discountType,
      duration,
      lectures,
      projects,
      opportunitie1,
      opportunitie2,
      tools: mergedTools,
      curriculums,
      positions,
      overview,
      description,
    };
    // console.log(postData);
    formData.append("course_image", image);
    formData.append("category_id", categoreyId);
    formData.append("name", name);
    formData.append("slogan", slogan);
    formData.append("online_amount", onlineFee);
    formData.append("offline_amount", offlineFee);
    formData.append("discount_amount", discountAmount);
    // formData.append("discount_type", discountType);
    formData.append("course_type", courseType);
    formData.append("course_overview", overview);
    formData.append("description", description);
    formData.append("course_curriculum", JSON.stringify(curriculums));
    formData.append("job_position", JSON.stringify(positions));
    formData.append("duration", duration);
    formData.append("total_lecture", lectures);
    formData.append("total_project", projects);
    formData.append("tools", JSON.stringify(mergedTools));
    formData.append("job_opportunities_1", opportunitie1);
    formData.append("job_opportunities_2", opportunitie2);
    try {
      setPostLoading(true);
      // Create headers with the Authorization token
      const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
      });
      // Make a POST request using the fetch method
      const response = await fetch(
        "https://api.pathshalait.com/api/v1/courses",
        {
          method: "POST",
          headers,
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === true) {
        window.alert("Course added successfully!");
        window.location.reload();
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
    <section className="px-5 py-10 min-h-screen">
      <div action="" className="shadow p-8">
        <h5 className="font-semibold text-xl">Add Service</h5>
        {/* data inputs */}
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="mt-5"
        />

        <div className="grid gap-5 md:grid-cols-2 mt-5">
          <Select
            label="Select Categorey"
            onChange={(value) => setCategoreyId(value)}
          >
            {categories?.map((c, i) => (
              <Option key={i} value={c?.id}>
                <div className="flex items-center gap-2">
                  <img src={c?.icon} alt="" className="h-[30px] w-[30px]" />
                  <p>{c?.name}</p>
                </div>
              </Option>
            ))}
          </Select>
          <Input label="Enter Name" onChange={(e) => setName(e.target.value)} />
          <Input
            label="Amount"
            onChange={(e) => setdiscountAmount(e.target.value)}
            type="number"
          />
          <div className="flex gap-2 items-center w-full">
            <div className="relative flex w-full">
              <Input
                type="text"
                label="Service Specialities"
                value={position}
                onChange={onPositionChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                onClick={addPositions}
                color={position ? "gray" : "blue-gray"}
                disabled={!position}
                className="!absolute right-1 top-1 rounded"
              >
                Add
              </Button>
            </div>
            <div className="relative">
              <Button
                size="sm"
                onClick={handleOpen2}
                className="flex items-center gap-2"
              >
                <AiFillEye className="text-xl text-blue" /> View
              </Button>
              {positions.length > 0 && (
                <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
              )}
              <Dialog open={open2} handler={handleOpen2}>
                <DialogHeader>Service Specialities</DialogHeader>
                <DialogBody divider>
                  {positions.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {positions.map((c, i) => (
                        <div key={i} className="flex justify-between">
                          <p className="text-xl">
                            {i + 1}. {c}
                          </p>
                          <AiOutlineDelete
                            onClick={() => removePosition(i)}
                            className="text-red-500 text-3xl cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-5 font-semibold text-red-500">
                      Enter Something!
                    </p>
                  )}
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    size="sm"
                    onClick={handleOpen2}
                    className="mr-1"
                  >
                    <span>Close</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row gap-5">
          <Textarea
            label="Description"
            onChange={(e) => setopportunitie2(e.target.value)}
            type="text"
            rows={4}
          />
          <Textarea
            label="Planning & Implementation"
            onChange={(e) => setopportunitie1(e.target.value)}
            type="text"
            rows={4}
          />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-5">
          <div>
            <Checkbox
              label="Basic"
              checked={basic}
              onChange={() => setBasic(!basic)}
            />
            {basic && (
              <div className="flex gap-2 items-center w-full">
                <div className="relative flex w-full">
                  <Input
                    type="text"
                    label="Package Features"
                    value={curriculum}
                    onChange={onCurriculumChange}
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={addCurriculums}
                    color={curriculum ? "gray" : "blue-gray"}
                    disabled={!curriculum}
                    className="!absolute right-1 top-1 rounded"
                  >
                    Add
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    size="sm"
                    onClick={handleOpen}
                    className="flex items-center gap-2"
                  >
                    <AiFillEye className="text-xl text-blue" /> View
                  </Button>
                  {curriculums.length > 0 && (
                    <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
                  )}
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Service Features</DialogHeader>
                    <DialogBody divider>
                      {curriculums.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {curriculums.map((c, i) => (
                            <div key={i} className="flex justify-between">
                              <p className="text-xl">
                                {i + 1}. {c}
                              </p>
                              <AiOutlineDelete
                                onClick={() => removeCurriculum(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="py-5 font-semibold text-red-500">
                          Enter Something!
                        </p>
                      )}
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        size="sm"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Close</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
          <div>
            <Checkbox
              label="Standard"
              checked={standard}
              onChange={() => setStandard(!standard)}
            />
            {standard && (
              <div className="flex gap-2 items-center w-full">
                <div className="relative flex w-full">
                  <Input
                    type="text"
                    label="Package Features"
                    value={curriculum}
                    onChange={onCurriculumChange}
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={addCurriculums}
                    color={curriculum ? "gray" : "blue-gray"}
                    disabled={!curriculum}
                    className="!absolute right-1 top-1 rounded"
                  >
                    Add
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    size="sm"
                    onClick={handleOpen}
                    className="flex items-center gap-2"
                  >
                    <AiFillEye className="text-xl text-blue" /> View
                  </Button>
                  {curriculums.length > 0 && (
                    <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
                  )}
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Service Features</DialogHeader>
                    <DialogBody divider>
                      {curriculums.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {curriculums.map((c, i) => (
                            <div key={i} className="flex justify-between">
                              <p className="text-xl">
                                {i + 1}. {c}
                              </p>
                              <AiOutlineDelete
                                onClick={() => removeCurriculum(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="py-5 font-semibold text-red-500">
                          Enter Something!
                        </p>
                      )}
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        size="sm"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Close</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
          <div>
            <Checkbox
              label="Premium"
              checked={premium}
              onChange={() => setPremium(!premium)}
            />
            {premium && (
              <div className="flex gap-2 items-center w-full">
                <div className="relative flex w-full">
                  <Input
                    type="text"
                    label="Package Features"
                    value={curriculum}
                    onChange={onCurriculumChange}
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={addCurriculums}
                    color={curriculum ? "gray" : "blue-gray"}
                    disabled={!curriculum}
                    className="!absolute right-1 top-1 rounded"
                  >
                    Add
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    size="sm"
                    onClick={handleOpen}
                    className="flex items-center gap-2"
                  >
                    <AiFillEye className="text-xl text-blue" /> View
                  </Button>
                  {curriculums.length > 0 && (
                    <div className="h-3 w-3 rounded-full bg-green-400 absolute -top-1 -right-1 shadow-xl"></div>
                  )}
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Service Features</DialogHeader>
                    <DialogBody divider>
                      {curriculums.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {curriculums.map((c, i) => (
                            <div key={i} className="flex justify-between">
                              <p className="text-xl">
                                {i + 1}. {c}
                              </p>
                              <AiOutlineDelete
                                onClick={() => removeCurriculum(i)}
                                className="text-red-500 text-3xl cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="py-5 font-semibold text-red-500">
                          Enter Something!
                        </p>
                      )}
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        size="sm"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Close</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </div>
        <Button onClick={handleAddCourse} className="mt-5">
          {postLoading ? "Loading..." : "Add"}
        </Button>
      </div>
    </section>
  );
}
