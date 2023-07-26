import { IDespesa } from "./backend";

export interface IDespesaScreenState {
  despesas: IDespesa[];
  despesasSelected: boolean[];
}

export type IDespesaScreenAction =
  | {
      type: "load";
      payload: { despesas: IDespesa[] };
    }

export function reducer(
  state: IDespesaScreenState,
  action: IDespesaScreenAction
): IDespesaScreenState {
  switch (action.type) {
    case "load":
      const despesas = action.payload.despesas ?? state.despesas;
      const selected = action.payload.despesas
        ? action.payload.despesas.map(() => true)
        : state.despesasSelected;
      return {
        ...state,
        despesas,
        despesasSelected: selected,
      };
    default:
      return state;
  }
}
