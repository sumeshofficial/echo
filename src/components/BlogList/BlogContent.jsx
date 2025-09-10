const Quote = ({ quote, caption }) => {
  return (
    <div className="bg-purple/10 p-3 ps-5 border-1 border-purple">
      <p className="text-xl leading-10 md:text-2xl dark:text-white">{quote}</p>
      {caption.length ? (
        <p className="w-full text-purple text-base dark:text-white">{caption}</p>
      ) : (
        ""
      )}
    </div>
  );
};

const List = ({ style, items }) => {
    return (
      <ol className={`ps-5 ${style === "ordered" ? "list-desimal" : "list-disc"}`}>
        {items.map((listItems, i) => {
          return (
            <li
              key={i}
              className="my-4 dark:text-white"
              dangerouslySetInnerHTML={{ __html: listItems.content }}
            ></li>
          );
        })}
      </ol>
    );
};

const BlogContent = ({ block }) => {
  const { type, data } = block;

  if (type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }} className="dark:text-white"></p>;
  }

  if (type === "header") {
    const HeaderTag = `h${data.level}`;
    return <HeaderTag dangerouslySetInnerHTML={{ __html: data.text }} className="dark:text-white"/>;
  }
  if (type === "quote") {
    return <Quote quote={data.text} caption={data.caption}/>;
  }
  if (type === "list") {
    return <List style={data.style} items={data.items}/>;
  }
};

export default BlogContent;
