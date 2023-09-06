import Highlight from "./Highlight";

const data: { color: string; text: string }[] = [
  { color: "yellow", text: "New highlight" },
  { color: "yellow", text: "Sample text for highlight" },
  { color: "red", text: "Sample text for highlight" },
  { color: "yellow", text: "Sample text for highlight" },
  { color: "orange", text: "Sample text for highlight" },
  { color: "red", text: "Sample text for highlight" },
  { color: "orange", text: "Sample text for highlight" },
  { color: "blue", text: "Sample text for highlight" },
];
const Highlights = () => {
  return (
    <div className="whl-flex whl-flex-col">
      {data.map((item, index) => (
        <Highlight key={index} {...item} />
      ))}
    </div>
  );
};

export default Highlights;
