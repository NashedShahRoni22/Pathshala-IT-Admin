import React from "react";

export default function CourseDetails({ courseDetails }) {
  return (
    <section className="text-black h-[60vh] overflow-y-auto scroll-smooth p-5">
      <div className="flex gap-10">
        <img src={courseDetails?.course_image} className="h-[200px] w-[200px] rounded-xl"/>
        <div className="flex flex-col gap-2">
          <p className="">{courseDetails?.slogan}</p>
          <h1 className="text-xl font-semibold">{courseDetails?.name}</h1>
          <div className="grid grid-cols-3 gap-x-[15px] md:gap-x-[30px]">
            <div className="bg-blue-400 text-white py-[12px] px-[16px] flex flex-col items-center justify-center rounded-xl">
              <h1 className="">{courseDetails?.duration}</h1>
              <p className="">Month</p>
            </div>
            <div className="bg-blue-400 text-white py-[12px] px-[16px] flex flex-col items-center justify-center rounded-xl">
              <h1 className="">{courseDetails?.total_lecture}</h1>
              <p className="">Lectures</p>
            </div>
            <div className="bg-blue-400 text-white py-[12px] px-[16px] flex flex-col items-center justify-center rounded-xl">
              <h1 className="">{courseDetails?.total_project}</h1>
              <p className="">Projects</p>
            </div>
          </div>
          <p className="">{courseDetails?.description}</p>
        </div>
      </div>

      <div className="mt-10 mx-5 md:container md:mx-auto">
        <div className="flex flex-col gap-5">
          <div className="">
            <h1 className="font-semibold">Course Overview</h1>
            <p className="">
              {courseDetails?.course_overview}
            </p>
          </div>
          <div className="">
            <h1 className="font-semibold">Course Curriculum</h1>
            <ul className="grid grid-cols-2 ml-10 list-disc">
              {courseDetails?.course_curriculum?.map((cc, i) => (
                <li key={i}>
                  {cc}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h1 className="font-semibold">
              Softwares You'll Learn
            </h1>
            <ul className="grid grid-cols-2">
              {courseDetails?.all_tools?.software?.map((ts, i) => (
                <li className="text-[16px] flex items-center gap-[8px]" key={i}>
                  <img
                    className="h-[24px] md:h-[48px] w-[24px] md:w-[48px]"
                    src={ts?.icon}
                    alt=""
                  />
                  <p className="text-[14px] md:text-[18px]">{ts?.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h1 className="font-semibold">
              This Course is Designed for
            </h1>
            <ul className="grid grid-cols-2">
              {courseDetails?.all_tools?.profession?.map((ts, i) => (
                <li className="text-[16px] flex items-center gap-[8px]" key={i}>
                  <img
                    className="h-[24px] md:h-[48px] w-[24px] md:w-[48px]"
                    src={ts?.icon}
                    alt=""
                  />
                  <p className="text-[14px] md:text-[18px]">{ts?.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h1 className="font-semibold">Career Opportunities</h1>
            <div className="grid md:grid-cols-2">
              <div>
                <p>{courseDetails?.job_opportunities_1}</p>
              </div>
              <div>
                <p>{courseDetails?.job_opportunities_2}</p>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="font-semibold">Open Job Positions</h1>
            <ul className="grid grid-cols-2 list-disc ml-10">
              {courseDetails?.job_position?.map((cc, i) => (
                <li key={i}>
                  {cc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
