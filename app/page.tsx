type Document = {
  id: string;
  text: string;
};

const apiUrl = process.env.API_ENDPOINT || "http://localhost:5521";

const fetchDocuments = async () => {
  const response = await fetch(`${apiUrl}/getDocuments`, {
    mode: "cors",
  });

  if (!response.ok) {
    return [];
  }

  const documentList = (await response.json()) as Document[];
  return documentList;
};

const IndexPage = async () => {
  const docs = await fetchDocuments();
  return (
    <div className="bg-zinc-900">
      <div>IndexPage</div>
      <div className="m-3 flex flex-col gap-5">
        {docs.map((doc) => {
          return <div key={doc.id}>{doc.text}</div>;
        })}
      </div>
    </div>
  );
};

export default IndexPage;
