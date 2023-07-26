export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function getDespesasEndpoint(mes: string): Promise<IDespesa[]> {
  console.log('Backend', mes)
  return fetch(`http://localhost:3001/despesas?mes=${mes}`, {
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
