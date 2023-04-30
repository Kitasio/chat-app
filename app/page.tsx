type Document = {
  filename: string;
  id: string;
};

const fetchDocuments = async () => {
  try {
    const response = await fetch(`${process.env.apiEndpoint}/list_indices`, {
      mode: "cors",
      cache: "no-store"
    });

    const documentList = (await response.json()) as Document[];
    return documentList;
  } catch (error) {
    console.log(error)
    return [];
  }
};

const IndexPage = async () => {
  const docs = await fetchDocuments();
  return (
    <div className="bg-zinc-900">
      <div>IndexPage</div>
      <div className="m-3 flex flex-col gap-5">
        {docs.map((doc) => {
          return <div key={doc.id}>{doc.filename}</div>;
        })}
      </div>
    </div>
  );
};

export default IndexPage;
