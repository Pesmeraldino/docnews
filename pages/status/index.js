import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-br");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dataBaseInformation = "Carregando...";

  if (!isLoading && data) {
    dataBaseInformation = (
      <>
        <div>Versão: {data.dependecies.database.version}</div>
        <div>
          Conexões abertas: {data.dependecies.database.opened_connections}
        </div>
        <div>Conexões máximas: {data.dependecies.database.max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <p>{dataBaseInformation}</p>
    </>
  );
}
