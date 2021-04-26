import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Total = ({ course }) => {
  let sum = course.parts.reduce((sum, part) => {
    return part.exercises + sum;
  }, 0);
  return (
    <p>
      <b>Total of {sum} exericises</b>
    </p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Course;
