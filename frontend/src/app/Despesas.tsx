import { useState, useEffect, useReducer, useMemo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IDespesa, getDespesasEndpoint, getTodasDespesasEndpoint } from "./backend";
import { reducer } from "./despesaScreenReducer";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { getToday } from "./dateFunctions";

const useStyles = makeStyles({
  table: {
    minHeight: "100%",
  },
});

const todasDespesas = getTodasDespesasEndpoint().then((item) => item.map((despesa) => despesa.mes.substring(0, 4)));

  console.log(todasDespesas)
  // Função para obter o campo "mes" de uma despesa
  function getMes(despesa: IDespesa): string {
    return despesa.mes;
  }

  // // Ordena a coleção de despesas pelo campo "mes"
  // const despesasOrdenadas: IDespesa[] = todasDespesas.sort((a, b) => {
  //   const mesA = getMes(a);
  //   const mesB = getMes(b);
  //   return mesA.localeCompare(mesB);
  // });

  // // Seleciona as quatro primeiras posições do campo "mes" = ano
  // const colecao = new Set(despesasOrdenadas
  //   .map((despesa) => despesa.mes.substring(0, 4)));

  // const arrayAnos: string[] = Array.from(colecao);

export default function Despesas() {
  const [selectedAno, setSelectedAno] = useState("");
  const [selectedMes, setSelectedMes] = useState("");

  // const handleChangeAno = (event) => {
  //   setSelectedAno(event.target.value);
  // };

  // const handleChangeMes = (event) => {
  //   setSelectedMes(event.target.value);
  // };

  const { mes } = useParams<{ mes: string }>();

  // const mes = "2020-10";
  // const { despesas } = useDespesaScreenState(mes);

  const classes = useStyles();
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  // const [todasDespesas, setTodasDespesas] = useState<IDespesa[]>([]);
  // const [arrayAnos, setArrayAnos] = useState<string[]>([]);

  useEffect(() => {
    // getDespesasEndpoint(mes).then(despesas  => setDespesas(despesas));
    // ou
    getDespesasEndpoint(mes).then(setDespesas);
  }, [mes]);

  return (
    <TableContainer component={"div"}>
      <Box display="flex" width="100%" alignItems="center" padding="12px">
        <Box marginRight="50px">
          <InputLabel id="select-ano">Ano</InputLabel>
          <Select
            labelId="select-ano"
            value={selectedAno}
            // label="Ano"
            // onChange={handleChangeAno}
          >
          {/* {arrayAnos.map((ano) => (
              <MenuItem key={ano} value={ano}>{ano}</MenuItem>
            ))} */}
          </Select>
        </Box>
        <Box>
          <InputLabel id="select-mes">Mês</InputLabel>
          <Select
            labelId="select-mes"
            value={selectedMes}
            label="Mês"
            // onChange={handleChangeMes}
          >
            
            
            <MenuItem value={1}>Janeiro</MenuItem>
            <MenuItem value={2}>Fevereiro</MenuItem>
            <MenuItem value={3}>Março</MenuItem>
          </Select>
        </Box>
      </Box>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Dia</TableCell>
            <TableCell align="right">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.descricao}
              </TableCell>
              <TableCell align="right">{row.categoria}</TableCell>
              <TableCell align="right">{row.dia}</TableCell>
              <TableCell align="right">{row.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
