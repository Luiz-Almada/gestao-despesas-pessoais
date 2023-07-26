import { useEffect, useReducer, useMemo } from "react";
// import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getDespesasEndpoint } from './backend';
import { reducer } from "./despesaScreenReducer";


function useDespesaScreenState(mes: string) {
  const [state, dispatch] = useReducer(reducer, {
    despesas: [],
    despesasSelected: [],
  });

  const { despesas, despesasSelected } = state;

  useEffect(() => {
    Promise.all([getDespesasEndpoint(mes)]).then(
      ([despesas]) => {
        dispatch({ type: "load", payload: { despesas } });
      }
    );
  }, [mes]);

  return {
    despesas,
    dispatch,
    despesasSelected,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function App() {
  // const { mes } = useParams<{ mes: string }>();
  const mes = '2020-10'
  const { despesas } = useDespesaScreenState(mes);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
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
