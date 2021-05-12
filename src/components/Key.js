const Key = ({ onClick, text, wide, blue, mem }) => {
  return (
    <button
      onClick={onClick}
      className={["key", wide && "wide", blue && "blue", mem && "mem"].join(" ")}
    >
      {text}
    </button>
  );
};

export default Key;