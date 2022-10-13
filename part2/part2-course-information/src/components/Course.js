const Course = ({ course }) => {
  const sum = course.parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      ))}
      <div>
        <b>total of {sum} exercises</b>
      </div>
    </div>
  );
};

export default Course;
